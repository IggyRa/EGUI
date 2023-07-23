#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QString>
#include <QMainWindow>
#include <QFile>
#include <QFileDialog>
#include <QMessageBox>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonValue>
#include <QJsonParseError>
#include <QTreeWidget>
#include <QTreeWidgetItem>
#include <QIODevice>
#include <QDataStream>
#include <QString>
#include <QDebug>
#include <QInputDialog>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_actionOpen_triggered();

    void on_actionSave_as_triggered();

    void on_actionEdit_triggered();

    void on_actionRemove_triggered();

    void on_actionNew_triggered();

    void on_actionAdd_triggered();

private:
    Ui::MainWindow *ui;
    QString currentFile = "";
    void jsonToTree(const QJsonValue& jsonValue, QTreeWidgetItem* parentItem);
    QJsonDocument treeToJson();
    QJsonValue jsonToItem(QTreeWidgetItem* item);
};
#endif // MAINWINDOW_H
