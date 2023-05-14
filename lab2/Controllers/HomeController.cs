using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models;

namespace Warehouse.Controllers
{
    public class HomeController : Controller
    {
        private readonly WarehouseContext _context;

        public HomeController(WarehouseContext context)
        {
            _context = context;
        }

        // GET: ItemModels
        public async Task<IActionResult> Index()
        {
              return _context.ItemModel != null ? 
                          View(await _context.ItemModel.ToListAsync()) :
                          Problem("Entity set 'WarehouseContext.ItemModel'  is null.");
        }

        // GET: ItemModels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ItemModels/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("itemID,name,description,category,quantity,unit,price")] ItemModel itemModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(itemModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(itemModel);
        }

        // GET: ItemModels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ItemModel == null)
            {
                return NotFound();
            }

            var itemModel = await _context.ItemModel.FindAsync(id);
            if (itemModel == null)
            {
                return NotFound();
            }
            return View(itemModel);
        }

        // POST: ItemModels/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("itemID,name,description,category,quantity,unit,price")] ItemModel itemModel)
        {
            if (id != itemModel.itemID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(itemModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ItemModelExists(itemModel.itemID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(itemModel);
        }

        // GET: ItemModels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ItemModel == null)
            {
                return NotFound();
            }

            var itemModel = await _context.ItemModel
                .FirstOrDefaultAsync(m => m.itemID == id);
            if (itemModel == null)
            {
                return NotFound();
            }

            return View(itemModel);
        }

        // POST: ItemModels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.ItemModel == null)
            {
                return Problem("Entity set 'WarehouseContext.ItemModel'  is null.");
            }
            var itemModel = await _context.ItemModel.FindAsync(id);
            if (itemModel != null)
            {
                _context.ItemModel.Remove(itemModel);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ItemModelExists(int id)
        {
          return (_context.ItemModel?.Any(e => e.itemID == id)).GetValueOrDefault();
        }
    }
}
