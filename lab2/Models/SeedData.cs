
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Warehouse.Data;
using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Warehouse.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new WarehouseContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<WarehouseContext>>()))
        {
            // Look for any ItemModels.
            if (context.ItemModel.Any())
            {
                return;   // DB has been seeded
            }
            context.ItemModel.AddRange(
                new ItemModel
                {
                    name = "Flour",
                    description = "Maka",
                    category = "Food",
                    quantity = 3,
                    unit = "kgs",
                    price = 1,
                },
                new ItemModel
                {
                    name = "Metal",
                    description = "Scraps",
                    category = "Material",
                    quantity = 150,
                    unit = "kgs",
                    price = 10,
                },
                new ItemModel
                {
                    name = "Water",
                    description = "Polish",
                    category = "Food",
                    quantity = 200,
                    unit = "litre",
                    price = 2,
                }
                );
            context.SaveChanges();
        }
    }
}
