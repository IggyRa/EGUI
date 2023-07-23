#include "mainwindow.h"
#include "./ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->treeWidget->setColumnCount(2);
    ui->treeWidget->setColumnWidth(0,400);
    ui->treeWidget->setColumnWidth(1,200);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::jsonToTree(const QJsonValue& jsonValue, QTreeWidgetItem* parentItem) {
    if (jsonValue.isObject()) {
        const QJsonObject jsonObj = jsonValue.toObject();
        for (auto it = jsonObj.constBegin(); it != jsonObj.constEnd(); ++it) {
            QTreeWidgetItem* childItem = new QTreeWidgetItem(parentItem);
            childItem->setText(0, it.key());
            jsonToTree(it.value(), childItem);
            parentItem->addChild(childItem);
        }
    } else if (jsonValue.isArray()) {
        const QJsonArray jsonArray = jsonValue.toArray();
        for (int i = 0; i < jsonArray.size(); ++i) {
            QTreeWidgetItem* childItem = new QTreeWidgetItem(parentItem);
            jsonToTree(jsonArray.at(i), childItem);
            parentItem->addChild(childItem);
        }
    } else {
        // if int
        if (jsonValue.isDouble()) {
            int intValue = jsonValue.toInt();
            if (jsonValue.toDouble() == intValue) {
                parentItem->setText(1, QString::number(intValue));
                return;
            }
        }
        // if bool
        if (jsonValue.isBool()) {
            parentItem->setText(1, jsonValue.toBool() ? "true" : "false");
            return;
        }
        parentItem->setText(1, jsonValue.toString());
    }
}


void MainWindow::on_actionOpen_triggered()
{
    QString fileName = QFileDialog::getOpenFileName(this, tr("Open File"), "", tr("JSON file (*.json)"));
       if (fileName.isEmpty()) {
           return;
       }

       QFile file(fileName);
       if (!file.open(QIODevice::ReadOnly | QIODevice::Text)) {
           QMessageBox::warning(this, tr("Warning"), tr("Cannot open the file: ") + file.errorString());
           return;
       }
       ui->treeWidget->clear();
       setWindowTitle(fileName);

       QJsonParseError jsonError;
       QJsonDocument jsonDoc = QJsonDocument::fromJson(file.readAll(), &jsonError);
       if (jsonError.error != QJsonParseError::NoError) {
           QMessageBox::warning(this, tr("Error"), tr("Failed to parse JSON data: ") + jsonError.errorString());
           return;
       }

       QJsonObject jsonObj = jsonDoc.object();
       QTreeWidgetItem* rootItem = ui->treeWidget->invisibleRootItem();
       jsonToTree(jsonObj, rootItem);
       ui->treeWidget->addTopLevelItem(rootItem);
       file.close();
}


void MainWindow::on_actionSave_as_triggered()
{
    if (ui->treeWidget->topLevelItemCount() == 0) {
          QMessageBox::warning(this, tr("Warning"), tr("Cannot save an empty file."));
          return;
    }
    QJsonDocument data = treeToJson();
    QString filename = QFileDialog::getSaveFileName(this, tr("Save file"), "", tr("JSON file (*.json);;All Files (*)"));
    if (filename.isEmpty()) {
        return;
    }

    QFile file(filename);
    if (!file.open(QIODevice::WriteOnly | QFile::Text)) {
        QMessageBox::warning(this, tr("Warning"), tr("Cannot save the file: ") + file.errorString());
        return;
    }
    file.write(data.toJson(QJsonDocument::Indented));
    file.close();
    currentFile = filename;
}

QJsonDocument MainWindow::treeToJson()
{
    QTreeWidgetItem* topLevelItem = ui->treeWidget->topLevelItem(0);
    QJsonValue topLevelValue = jsonToItem(topLevelItem);
    QJsonDocument document(topLevelValue.toObject());
    return document;
}



QJsonValue MainWindow::jsonToItem(QTreeWidgetItem* item)
{
    QJsonValue value;
    QJsonObject object;
    QJsonArray array;

    // Check if the item  a key and a value
    QString key = item->text(0);
    QString val = item->text(1);
    if (!key.isEmpty() && !val.isEmpty()) {
        value = QJsonValue::fromVariant(val);
    } else if (key.isEmpty() && !val.isEmpty()) {
        array.append(QJsonValue::fromVariant(val));
        value = QJsonValue(array);
    } else {
        bool ObjectChildren = false;
        bool ArrayChildren = false;

        for (int i = 0; i < item->childCount(); i++) {
            QTreeWidgetItem* child = item->child(i);
            QJsonValue childValue = jsonToItem(child);

            if (!child->text(0).isEmpty()) {
                 object[child->text(0)] = childValue;
                 ObjectChildren = true;
            } else {
                 array.append(childValue);
                 ArrayChildren = true;
            }
        }

        if (ObjectChildren && !ArrayChildren) {
             value = QJsonValue(object);
        } else if (ArrayChildren && !ObjectChildren) {
             value = QJsonValue(array);
        }
        else {
             object["values"] = QJsonValue(array);
             for (int i = 0; i < item->childCount(); i++) {
                 QTreeWidgetItem* child = item->child(i);
                 QString childKey = child->text(0);
                 if (!childKey.isEmpty()) {
                     object[childKey] = jsonToItem(child);
                }
        }
        value = QJsonValue(object);
    }
}
    return value;
}
void MainWindow::on_actionEdit_triggered()
{
    QTreeWidgetItem* currentItem = ui->treeWidget->currentItem();
    QString currentKey = currentItem->text(0);
    QString currentValue = currentItem->text(1);

    bool ok;
    QString newKey = QInputDialog::getText(this, tr("Edit Key"), tr("Key:"), QLineEdit::Normal, currentKey, &ok);
    if (!ok) {
        return;
    }
    QString newValue = QInputDialog::getText(this, tr("Edit Value"), tr("Value:"), QLineEdit::Normal, currentValue, &ok);
    if (!ok) {
        return;
    }
    currentItem->setText(0, newKey);
    currentItem->setText(1, newValue);
}



void MainWindow::on_actionRemove_triggered()
{
    QTreeWidgetItem* current = ui->treeWidget->currentItem();
    if (current) {
        delete current;
    }
}


void MainWindow::on_actionNew_triggered()
{
    if (ui->treeWidget->topLevelItemCount() != 0) {
        //if tree is not empty save file first
        QMessageBox::StandardButton ret;
        ret = QMessageBox::warning(this, tr("Application"),
                   tr("The document  been modified.\n"
                      "Do you want to save your changes?"),
                   QMessageBox::Save | QMessageBox::Discard |
                   QMessageBox::Cancel);

        if (ret == QMessageBox::Save) {
            on_actionSave_as_triggered();
        }
    }
    ui->treeWidget->clear();
    QTreeWidgetItem* rootItem = new QTreeWidgetItem(ui->treeWidget);
    ui->treeWidget->addTopLevelItem(rootItem);
    currentFile = "";
}


void MainWindow::on_actionAdd_triggered()
{
    QStringList options;
    options << "Object" << "Array" << "Value";
    QString selection = QInputDialog::getItem(this, tr("Select JSON Type"), tr("Type:"), options);

    QTreeWidgetItem* parentItem = ui->treeWidget->currentItem();
    if (!parentItem) {
        parentItem = ui->treeWidget->invisibleRootItem();
    }

    if (selection == "Object") {
        QTreeWidgetItem* objectItem = new QTreeWidgetItem(parentItem);
        objectItem->setText(0, "New Object");
        parentItem->addChild(objectItem);
    }
    else if (selection == "Array") {
        QTreeWidgetItem* arrayItem = new QTreeWidgetItem(parentItem);
        arrayItem->setText(0, "New Array");
        parentItem->addChild(arrayItem);
    }
    else if (selection == "Value") {
        QTreeWidgetItem* valueItem =  new QTreeWidgetItem(parentItem);
        valueItem->setText(0, "New Key");
        valueItem->setText(1, "New Value");
    }
}

