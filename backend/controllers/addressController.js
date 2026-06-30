import Address from '../models/addressModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Add a new address
// @route   POST /api/address
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
  const { street, city, state, postalCode, country, phone } = req.body;

  const address = new Address({
    user: req.user._id,
    street,
    city,
    state,
    postalCode,
    country,
    phone,
  });

  const createdAddress = await address.save();
  res.status(201).json(createdAddress);
});

// @desc    Get user addresses
// @route   GET /api/address
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });
  res.json(addresses);
});

export { addAddress, getAddresses };
