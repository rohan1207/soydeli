import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../utils/api";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiX } from "react-icons/fi";

const ManageMenu = () => {
  const [menu, setMenu] = useState([]); // raw categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // {category, item}
  const emptyForm = {
    category: "",
    sku: "",
    name: "",
    mrp: "",
    discountedPrice: "",
    serves: "",
    description: "",
    ingredients: "",
    images: "",
    isAvailable: true,
    bestSeller: false,
  };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [togglingSku, setTogglingSku] = useState(null); // for quick availability toggle

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await apiFetch("/api/menu");
        setMenu(data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, []);

  const allItems = useMemo(() => {
    // Flatten for search filtering
    return menu.flatMap((cat) =>
      cat.items.map((it) => ({ ...it, __category: cat.category }))
    );
  }, [menu]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter((it) =>
      [
        it.name,
        it.__category,
        it.sku,
        it.description,
        it.ingredients,
        ...(it.recommended || []),
      ].some((val) => val && val.toString().toLowerCase().includes(q))
    );
  }, [allItems, query]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };
  const openEdit = (item, category) => {
    setEditing({ sku: item.sku, category });
    setForm({
      category,
      sku: item.sku,
      name: item.name,
      mrp: item.mrp || "",
      discountedPrice: item.discountedPrice,
      serves: item.serves,
      description: item.description,
      ingredients: item.ingredients,
      images: (item.images || []).join(","),
      isAvailable: item.isAvailable,
      bestSeller: item.bestSeller,
    });
    setShowModal(true);
  };

  const handleDelete = async (sku) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const updated = await apiFetch(`/api/menu/item/${sku}`, {
        method: "DELETE",
      });
      setMenu(updated);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        category: form.category.trim(),
        sku: form.sku.trim(),
        name: form.name.trim(),
        mrp: form.mrp ? Number(form.mrp) : undefined,
        discountedPrice: Number(form.discountedPrice),
        serves: Number(form.serves),
        description: form.description,
        ingredients: form.ingredients,
        images: form.images
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        isAvailable: form.isAvailable,
        bestSeller: form.bestSeller,
      };
      let updated;
      if (editing) {
        updated = await apiFetch(`/api/menu/item/${editing.sku}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        updated = await apiFetch("/api/menu/item", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setMenu(updated);
      setShowModal(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleAvailability = async (item) => {
    if (togglingSku) return; // prevent parallel
    setTogglingSku(item.sku);
    setError("");
    try {
      // Build payload mirroring edit structure (backend expects full object)
      const payload = {
        category: item.__category,
        sku: item.sku,
        name: item.name,
        mrp: item.mrp ? Number(item.mrp) : undefined,
        discountedPrice: Number(item.discountedPrice),
        serves: Number(item.serves),
        description: item.description,
        ingredients: item.ingredients,
        images: (item.images || []).map((i) => i),
        isAvailable: !item.isAvailable,
        bestSeller: item.bestSeller,
      };
      const updated = await apiFetch(`/api/menu/item/${item.sku}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setMenu(updated);
    } catch (e) {
      setError(e.message);
    } finally {
      setTogglingSku(null);
    }
  };

  const closeModal = () => {
    if (!saving) setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Menu</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, category, sku..."
              className="pl-10 pr-3 py-2 rounded-lg border bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium shadow hover:bg-amber-600 transition"
          >
            <FiPlus />
            Add Item
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
      {loading ? (
        <div className="text-sm text-gray-500 animate-pulse">
          Loading menu...
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredItems.map((item) => (
                  <tr
                    key={item.sku}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        {item.images?.[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {item.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {item.__category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      ₹{Number(item.discountedPrice).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleAvailability(item)}
                        disabled={togglingSku === item.sku}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition border ${
                          item.isAvailable
                            ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                            : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                        title={
                          togglingSku === item.sku
                            ? "Updating..."
                            : "Click to toggle availability"
                        }
                        type="button"
                      >
                        {togglingSku === item.sku
                          ? "..."
                          : item.isAvailable
                          ? "Yes"
                          : "No"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openEdit(item, item.__category)}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.sku)}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No items match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiX />
            </button>
            <h2 className="text-xl font-semibold">
              {editing ? "Edit Item" : "Add New Item"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-3 max-h-[70vh] overflow-y-auto pr-1"
            >
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={setForm}
                  required
                  disabled={!!editing}
                />
                <Input
                  label="SKU"
                  name="sku"
                  value={form.sku}
                  onChange={setForm}
                  required
                  disabled={!!editing}
                />
                <Input
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={setForm}
                  required
                  className="col-span-2"
                />
                <Input
                  label="MRP"
                  name="mrp"
                  type="number"
                  value={form.mrp}
                  onChange={setForm}
                />
                <Input
                  label="Discounted Price"
                  name="discountedPrice"
                  type="number"
                  required
                  value={form.discountedPrice}
                  onChange={setForm}
                />
                <Input
                  label="Serves"
                  name="serves"
                  type="number"
                  required
                  value={form.serves}
                  onChange={setForm}
                />
                <Input
                  label="Images (comma URLs)"
                  name="images"
                  value={form.images}
                  onChange={setForm}
                  className="col-span-2"
                />
                <Toggle
                  label="Available"
                  name="isAvailable"
                  value={form.isAvailable}
                  onChange={setForm}
                />
                <Toggle
                  label="Best Seller"
                  name="bestSeller"
                  value={form.bestSeller}
                  onChange={setForm}
                />
                <TextArea
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={setForm}
                  required
                  className="col-span-2"
                />
                <TextArea
                  label="Ingredients"
                  name="ingredients"
                  value={form.ingredients}
                  onChange={setForm}
                  required
                  className="col-span-2"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium disabled:opacity-60"
                >
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
  required = false,
  disabled = false,
}) => (
  <label
    className={`flex flex-col gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 ${className}`}
  >
    {label}
    <input
      type={type}
      disabled={disabled}
      required={required}
      value={value}
      onChange={(e) => onChange((f) => ({ ...f, [name]: e.target.value }))}
      className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60"
    />
  </label>
);

const TextArea = ({
  label,
  name,
  value,
  onChange,
  className = "",
  required = false,
}) => (
  <label
    className={`flex flex-col gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 ${className}`}
  >
    {label}
    <textarea
      required={required}
      value={value}
      onChange={(e) => onChange((f) => ({ ...f, [name]: e.target.value }))}
      rows={3}
      className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </label>
);

const Toggle = ({ label, name, value, onChange }) => (
  <label className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange((f) => ({ ...f, [name]: e.target.checked }))}
      className="w-4 h-4"
    />{" "}
    {label}
  </label>
);

export default ManageMenu;
