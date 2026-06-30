import Menu from '../models/Menu.js';

/**
 * @desc    Fetch all menu items
 * @route   GET /api/menu
 * @access  Public
 */
export const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).json({ message: 'Server error while fetching menu data.' });
  }
};

/**
 * @desc    Add a new menu item (creates category if missing)
 * @route   POST /api/menu/item
 * @access  Private/Admin
 */
export const addMenuItem = async (req, res) => {
  try {
    const {
      category,
      sku,
      name,
      mrp,
      discountedPrice,
      serves,
      description,
      ingredients,
      images = [],
      recommended = [],
      ratings = 0,
      isAvailable = true,
      bestSeller = false,
    } = req.body;

    if (!category || !sku || !name || discountedPrice == null || !serves || !description || !ingredients) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let catDoc = await Menu.findOne({ category });
    if (!catDoc) {
      catDoc = await Menu.create({ category, items: [] });
    }

    const exists = catDoc.items.find(i => i.sku === sku);
    if (exists) {
      return res.status(400).json({ message: 'SKU already exists in this category' });
    }

    catDoc.items.push({
      sku,
      name,
      mrp,
      discountedPrice,
      serves,
      description,
      ingredients,
      images,
      recommended,
      ratings,
      isAvailable,
      bestSeller,
    });
    await catDoc.save();

    const updatedMenu = await Menu.find();
    res.status(201).json(updatedMenu);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ message: 'Server error while adding menu item.' });
  }
};

/**
 * @desc    Update a menu item by SKU
 * @route   PUT /api/menu/item/:sku
 * @access  Private/Admin
 */
export const updateMenuItem = async (req, res) => {
  try {
    const { sku } = req.params;
    const doc = await Menu.findOne({ 'items.sku': sku });
    if (!doc) return res.status(404).json({ message: 'Item not found' });

    const item = doc.items.find(i => i.sku === sku);
    ['name','mrp','discountedPrice','serves','description','ingredients','images','recommended','ratings','isAvailable','bestSeller'].forEach(field => {
      if (req.body[field] !== undefined) item[field] = req.body[field];
    });
    await doc.save();
    const updatedMenu = await Menu.find();
    res.json(updatedMenu);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Server error while updating menu item.' });
  }
};

/**
 * @desc    Delete a menu item by SKU
 * @route   DELETE /api/menu/item/:sku
 * @access  Private/Admin
 */
export const deleteMenuItem = async (req, res) => {
  try {
    const { sku } = req.params;
    const doc = await Menu.findOne({ 'items.sku': sku });
    if (!doc) return res.status(404).json({ message: 'Item not found' });
    doc.items = doc.items.filter(i => i.sku !== sku);
    await doc.save();
    const updatedMenu = await Menu.find();
    res.json(updatedMenu);
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Server error while deleting menu item.' });
  }
};
