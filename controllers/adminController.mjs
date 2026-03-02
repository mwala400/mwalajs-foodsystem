import { addFood as addFoodModel, getAllFoods, updateFood, deleteFood, getFoodById } from '../models/Food.mjs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer Storage
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function(req, file, cb){
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  }
});

export const upload = multer({ storage });

// Show manage foods page
export const showManageFoods = async (req, res) => {
  try {
    const foods = await getAllFoods();
    res.render('admin/manageFoods', { foods, page: 'manage-foods' });
  } catch (err) {
    res.send('Error loading foods');
  }
};

// Show Add Food Form
export const showAddFood = (req, res) => {
  res.render('admin/addFood', { page: 'add-food' });
};

// Add Food
export const addFood = async (req, res) => {
  try {
    const { name, category, allowed_religion, allowed_tribe, min_age } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    await addFoodModel({ name, category, allowed_religion, allowed_tribe, min_age, image });
    res.redirect('/admin/manage-foods');
  } catch (err) {
    res.send('Failed to add food');
  }
};

// Edit Food
export const editFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const existingFood = await getFoodById(foodId);

    const { name, category, allowed_religion, allowed_tribe, min_age } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : existingFood.image;

    // Delete old image if new one uploaded
    if (req.file && existingFood.image) {
      const oldPath = path.join(__dirname, '../public', existingFood.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await updateFood(foodId, { name, category, allowed_religion, allowed_tribe, min_age, image });
    res.redirect('/admin/manage-foods');
  } catch (err) {
    res.send('Update failed');
  }
};

// Delete Food
export const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const existingFood = await getFoodById(foodId);

    // Delete image
    if (existingFood.image) {
      const oldPath = path.join(__dirname, '../public', existingFood.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await deleteFood(foodId);
    res.redirect('/admin/manage-foods');
  } catch (err) {
    res.send('Delete failed');
  }
};
