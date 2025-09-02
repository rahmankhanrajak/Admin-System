import { useState } from 'react';
import './index.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('vendor');
  const [selectedVendor, setSelectedVendor] = useState("Raj");

  const [newTask, setNewTask] = useState("");
  const [formId, setformId] = useState(0);
  const [isUpdate, setisUpdate] = useState(false);

  const [selectBrand, setselectBrand] = useState("");
  const [selectqty, setselectqty] = useState("");
  const [productsList, setproductsList] = useState([
    {
      selectBrand: "Bisleri",
      selectqty: "10L",
      vendor: "Raj",
    }
  ]);
  const [formIdproduct, setformIdproduct] = useState(0);
  const [isUpdateProduct, setisUpdateProduct] = useState(false);

  const [Area, setArea] = useState("");
  const [vendorName, setvendorName] = useState("");
  const [Address, setAddress] = useState("");
  const [isvendorUpdate, setisvendorUpdate] = useState(false);
  const [formIdvendor, setformIdvendor] = useState(0);

  const [vendorsList, setvendorsList] = useState([
    { Area: "Chennai", Address: "Padi", vendorName: "Raj" },
    { Area: "Chennai", Address: "Padi", vendorName: "Rahul" }
  ]);

  const [brandList, setbrandList] = useState([
    { vendor: "Raj", newTask: "Bisleri" },
    { vendor: "Raj", newTask: "Aqua" },
    { vendor: "Rahul", newTask: "Aqua" },
  ]);

  // ---------------- Vendor Functions ----------------

  const addVendor = () => {
    if (!Area.trim() || !vendorName.trim() || !Address.trim()) {
      alert("All fields are required");
      return;
    }
    const vendor = { Area, vendorName, Address };
    setvendorsList([...vendorsList, vendor]);
    setArea("");
    setvendorName("");
    setAddress("");
  };

  const deleteVendor = (index) => {
    const vendorToDelete = vendorsList[index].vendorName;
    const updatedVendors = vendorsList.filter((_, i) => i !== index);
    setvendorsList(updatedVendors);

    const brandsToDelete = brandList
      .filter((brand) => brand.vendor === vendorToDelete)
      .map((brand) => brand.newTask);

    const updatedBrandList = brandList.filter((brand) => brand.vendor !== vendorToDelete);
    setbrandList(updatedBrandList);

    const updatedProducts = productsList.filter(
      (product) => !brandsToDelete.includes(product.selectBrand)
    );
    setproductsList(updatedProducts);
  };

  const editVendor = (item, index) => {
    setformIdvendor(index);
    setvendorName(item.vendorName);
    setArea(item.Area);
    setAddress(item.Address);
    setisvendorUpdate(true);
  };

  const updateVendor = () => {
    const updated = [...vendorsList];
    updated[formIdvendor] = { Area, Address, vendorName };
    setvendorsList(updated);
    setArea("");
    setvendorName("");
    setAddress("");
    setisvendorUpdate(false);
  };

  // ---------------- Brand Functions ----------------

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { vendor: selectedVendor, newTask };
    setbrandList([...brandList, task]);
    setNewTask("");
  };

  const deleteBrand = (index) => {
    const brandToDelete = brandList.filter((item) => item.vendor === selectedVendor)[index].newTask;
    const updatedBrandList = brandList.filter((item, i) => !(item.vendor === selectedVendor && i === index));
    setbrandList(updatedBrandList);
    const updatedProductsList = productsList.filter((product) => product.selectBrand !== brandToDelete);
    setproductsList(updatedProductsList);
  };

  const editTask = (item, index) => {
    setformId(index);
    setSelectedVendor(item.vendor);
    setNewTask(item.newTask);
    setisUpdate(true);
  };

  const updateTask = () => {
    const updatedTasks = [...brandList];
    updatedTasks[formId].vendor = selectedVendor;
    updatedTasks[formId].newTask = newTask;
    setbrandList(updatedTasks);
    setNewTask("");
    setisUpdate(false);
  };

  // ---------------- Product Functions ----------------

  const addProduct = () => {
    if (!selectBrand.trim() || !selectqty.trim()) return;
    const prod = { selectBrand, selectqty, vendor: selectedVendor };
    setproductsList([...productsList, prod]);
    setselectBrand("");
    setselectqty("");
  };

  const deleteProduct = (index) => {
    const filteredProducts = productsList.filter((_, i) => i !== index);
    setproductsList(filteredProducts);
  };

  const editProduct = (item, index) => {
    setformIdproduct(index);
    setSelectedVendor(item.vendor);
    setselectBrand(item.selectBrand);
    setselectqty(item.selectqty);
    setisUpdateProduct(true);
  };

  const updateProduct = () => {
    const updated = [...productsList];
    updated[formIdproduct] = { selectBrand, selectqty, vendor: selectedVendor };
    setproductsList(updated);
    setselectBrand("");
    setselectqty("");
    setisUpdateProduct(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '200px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <h3>WaterCane admin</h3>
        <button
          onClick={() => setActiveMenu('vendor')}
          style={{
            background: activeMenu === 'vendor' ? '#34495e' : 'transparent',
            color: 'white',
            padding: '10px',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >
          Vendor
        </button>
        <button
          onClick={() => setActiveMenu('brand')}
          style={{
            background: activeMenu === 'brand' ? '#34495e' : 'transparent',
            color: 'white',
            padding: '10px',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >
          Brand
        </button>
        <button
          onClick={() => setActiveMenu('product')}
          style={{
            background: activeMenu === 'product' ? '#34495e' : 'transparent',
            color: 'white',
            padding: '10px',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >
          Products
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* ---------------- Vendor UI ---------------- */}
        {activeMenu === 'vendor' && (
          <>
            <h2>Vendor Entry</h2>
            <input placeholder='Enter Area' value={Area} onChange={(e) => setArea(e.target.value)} />
            <input placeholder='Enter Vendor Name' value={vendorName} onChange={(e) => setvendorName(e.target.value)} />
            <input placeholder='Enter Address' value={Address} onChange={(e) => setAddress(e.target.value)} />
            {!isvendorUpdate
              ? <button className='ButtonInfo' onClick={addVendor}>Add Vendor</button>
              : <button className='ButtonInfo' onClick={updateVendor}>Update Vendor</button>
            }

            <h3>Vendors List</h3>
            <div className='tablebox'>

              <table>
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.vendorName}</td>
                      <td>{item.Address}</td>
                      <td>{item.Area}</td>
                      <td className='flex flex-row gap-2' >
                        <button className='ButtonInfo' onClick={() => editVendor(item, index)}>Edit</button>
                        <button className='ButtonInfo' onClick={() => deleteVendor(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ---------------- Brand & Product UI ---------------- */}
        {activeMenu === 'brand' && (
          <>
            <h2>Brand & Product Management</h2>

            {/* Vendor Dropdown */}
            <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
              <option value="">-- Select Vendor --</option>
              {vendorsList.map((vendor, i) => (
                <option key={i} value={vendor.vendorName}>{vendor.vendorName}</option>
              ))}
            </select>

            {/* Brand Input */}
            <input placeholder='Brand Name' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            {!isUpdate
              ? <button className='ButtonInfo' onClick={addTask}>Add Brand</button>
              : <button className='ButtonInfo' onClick={updateTask}>Update Brand</button>
            }

            {/* Brand List */}
            <h3>Brands List </h3>
            <div className='tablebox'>
              <table>
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Brand</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {brandList.filter(item => item.vendor === selectedVendor).map((item, index) => (
                    <tr key={index}>
                      <td>{item.newTask}</td>

                      <td className='flex flex-row gap-2'>
                        <button className='ButtonInfo' onClick={() => editTask(item, index)}>Edit</button>
                        <button className='ButtonInfo' onClick={() => deleteBrand(index)}>Delete</button>
                      </td>
                    </tr>
                  ))} */}
                  {brandList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.vendor}</td>
                      <td>{item.newTask}</td>

                      <td className='flex flex-row gap-2'>
                        <button className='ButtonInfo' onClick={() => editTask(item, index)}>Edit</button>
                        <button className='ButtonInfo' onClick={() => deleteBrand(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* {brandList.filter(item => item.vendor === selectedVendor).map((item, index) => (
              <div key={index}>
                {item.newTask}
                <button className='ButtonInfo' onClick={() => editTask(item, index)}>Edit</button>
                <button className='ButtonInfo' onClick={() => deleteBrand(index)}>Delete</button>
              </div>
            ))} */}

            {/* Product Form */}

            {/* <h3>Add Product for Vendor</h3>
            <select value={selectBrand} onChange={(e) => setselectBrand(e.target.value)}>
              <option value="">-- Select Brand --</option>
              {brandList
                .filter(item => item.vendor === selectedVendor)
                .map((item, index) => (
                  <option key={index} value={item.newTask}>
                    {item.newTask}
                  </option>
                ))}
            </select>

            <select value={selectqty} onChange={(e) => setselectqty(e.target.value)}>
              <option value="">-- Select Quantity --</option>
              <option value="10">10L</option>
              <option value="20">20L</option>
              <option value="30">30L</option>
            </select>

            {!isUpdateProduct ? (
              <button className='ButtonInfo' onClick={addProduct}>Add Product</button>
            ) : (
              <button className='ButtonInfo' onClick={updateProduct}>Update Product</button>
            )} */}

            {/* Product List */}
            {/* <h3>Products List</h3>
            <div className='tablebox'>
              <table>
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Brand</th>
                    <th>Qty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.vendor}</td>
                        <td>{item.selectBrand}</td>
                        <td>{item.selectqty}</td>

                        <td className='flex flex-row gap-2'>
                          <button className='ButtonInfo' onClick={() => editProduct(item, index)}>Edit</button>
                          <button className='ButtonInfo' onClick={() => deleteProduct(index)}>Delete</button>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div> */}
            {/* {productsList
              .filter(item => item.vendor === selectedVendor)
              .map((item, index) => (
                <div key={index}>
                  {item.selectBrand} - {item.selectqty}L
                  <button className='ButtonInfo' onClick={() => editProduct(item, index)}>Edit</button>
                  <button className='ButtonInfo' onClick={() => deleteProduct(index)}>Delete</button>
                </div>
              ))} */}
          </>
        )}
        {activeMenu === 'product' && (
          <>
            <h3>Add Product for Vendor</h3>

            <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
              <option value="">-- Select Vendor --</option>
              {vendorsList.map((vendor, i) => (
                <option key={i} value={vendor.vendorName}>{vendor.vendorName}</option>
              ))}
            </select>
            <select value={selectBrand} onChange={(e) => setselectBrand(e.target.value)}>
              <option value="">-- Select Brand --</option>
              {brandList
                .filter(item => item.vendor === selectedVendor)
                .map((item, index) => (
                  <option key={index} value={item.newTask}>
                    {item.newTask}
                  </option>
                ))}
            </select>

            <select value={selectqty} onChange={(e) => setselectqty(e.target.value)}>
              <option value="">-- Select Quantity --</option>
              <option value="10L">10L</option>
              <option value="20L">20L</option>
              <option value="30L">30L</option>
            </select>

            {!isUpdateProduct ? (
              <button className='ButtonInfo' onClick={addProduct}>Add Product</button>
            ) : (
              <button className='ButtonInfo' onClick={updateProduct}>Update Product</button>
            )}
            <h3>Products List</h3>
            <div className='tablebox'>
              <table>
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Brand</th>
                    <th>Qty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.vendor}</td>
                        <td>{item.selectBrand}</td>
                        <td>{item.selectqty}</td>

                        <td className='flex flex-row gap-2'>
                          <button className='ButtonInfo' onClick={() => editProduct(item, index)}>Edit</button>
                          <button className='ButtonInfo' onClick={() => deleteProduct(index)}>Delete</button>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </>
        )}
      </div>
    </div>
  );
}

export default App;
