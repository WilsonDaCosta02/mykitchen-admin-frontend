import React, { useState, useEffect } from "react";
import { getMenus, createMenu, updateMenu, deleteMenu } from "../services/menuService";
import type { MenuItem, MenuFormData } from '@/types/menu';
import { MenuCard } from '@/components/MenuCard';
import { MenuForm } from '@/components/MenuForm';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, ChefHat } from 'lucide-react';
import { toast } from 'sonner';

export default function Index() {
  // local state langsung di sini
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; itemId: number| null }>({
    isOpen: false,
    itemId: null,
  });

useEffect(() => {
  const fetchMenus = async () => {
    try {
      const data = await getMenus();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };
  fetchMenus();
}, []);


  // Add
  const addMenuItem = async (formData: MenuFormData) => {
  try {
    const newItem = await createMenu(formData);
    setMenuItems((prev) => [...prev, newItem]);
    toast.success("Menu item added successfully!");
  } catch (error) {
    console.error("Error adding menu:", error);
    toast.error("Failed to add menu item!");
  }
};


  // Update
  const updateMenuItem = async (id: number, formData: MenuFormData) => {
  try {
    const updatedItem = await updateMenu(Number(id), formData);
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item))
    );
    toast.success("Menu item updated successfully!");
  } catch (error) {
    console.error("Error updating menu:", error);
    toast.error("Failed to update menu item!");
  }
};


  // Delete
  const deleteMenuItem = async (id: number) => {
    try {
      await deleteMenu(id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Menu item deleted successfully!");
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu item!");
    }
  };

   // Form handlers
  const handleAddItem = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

const handleDeleteItem = (id: number) => {
  setDeleteDialog({ isOpen: true, itemId: id });
};


  const confirmDelete = async () => {
  if (deleteDialog.itemId !== null) {
    await deleteMenuItem(deleteDialog.itemId);
  }
  setDeleteDialog({ isOpen: false, itemId: null });
};


  const handleFormSubmit = (formData: MenuFormData) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
    } else {
      addMenuItem(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ChefHat className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Welcome to My Kitchen
          </h1>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Discover authentic Indonesian flavors crafted with love and tradition. 
            Each dish tells a story of our rich culinary heritage.
          </p>
          <Button
            onClick={handleAddItem}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Menu Item
          </Button>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Menu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of traditional Indonesian dishes, 
              each prepared with authentic ingredients and time-honored recipes.
            </p>
          </div>

          {menuItems.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No Menu Items Yet</h3>
              <p className="text-gray-400 mb-6">Start building your menu by adding your first dish!</p>
              <Button onClick={handleAddItem} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Menu Item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Menu Form Modal */}
      <MenuForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingItem={editingItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) => setDeleteDialog({ isOpen: open, itemId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the menu item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
