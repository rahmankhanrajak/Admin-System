import { useState } from 'react'
import './App.css'

function App() {
  const [selectedVendor, setSelectedVendor] = useState("Raj");


  const [newTask, setNewTask] = useState("")
  const [tasksList, settasksList] = useState(["Bisleri", "Aqua"])
  const [formId, setformId] = useState(0)
  const [isUpdate, setisUpdate] = useState(false)

  const [selectBrand, setselectBrand] = useState("")
  const [selectqty, setselectqty] = useState("")
  const [productsList, setproductsList] = useState([])
  const [formIdproduct, setformIdproduct] = useState(0)
  const [isUpdateProduct, setisUpdateProduct] = useState(false)

  const [Area, setArea] = useState("")
  const [vendorName, setvendorName] = useState("")
  const [Address, setAddress] = useState("")
  const [vendorsList, setvendorsList] = useState([
    {
      Area: "Chennai",
      Address: "Padi",
      vendorName: "Raj"
    },
    {
      Area: "Chennai",
      Address: "Padi",
      vendorName: "Rahul"
    },
  ])
  const [brandList, setbrandList] = useState([{
    vendor: "Raj",
    newTask: "Bisleri"
  }])

  const addTask = () => {
    if (!newTask.trim()) return
    let tempBrand = [...brandList]
    let task = {
      vendor: selectedVendor,
      newTask
    }
    tempBrand.push(task)
    setbrandList(tempBrand)

  }

  const deleteTask = (index) => {
    const filteredTasks = tasksList.filter((_, i) => i !== index)
    setbrandList(filteredTasks)
  }

  const editTask = (item, index) => {
    setformId(index)
    setNewTask(item.newTask)
    setisUpdate(true)
  }

  const updateTask = () => {
    let updatedTasks = [...brandList]
    updatedTasks[formId].newTask = newTask
    setbrandList(updatedTasks)
    setNewTask("")
    setisUpdate(false)
  }

  const addProduct = () => {
    if (!selectBrand.trim() || !selectqty.trim()) return
    const prod = {
      selectBrand,
      selectqty,
      vendor: selectedVendor

    }
    setproductsList([...productsList, prod])
    setselectBrand("")
    setselectqty("")
  }

  const deleteProduct = (index) => {
    const filteredProducts = productsList.filter((_, i) => i !== index)
    setproductsList(filteredProducts)
  }

  const deleteVendor = (index) => {
    const vendorToDelete = vendorsList[index].vendorName;

    const updatedVendors = vendorsList.filter((_, i) => i !== index);
    setvendorsList(updatedVendors);

    const brandsToDelete = brandList
      .filter(brand => brand.vendor === vendorToDelete)
      .map(brand => brand.newTask);

    const updatedBrandList = brandList.filter(brand => brand.vendor !== vendorToDelete);
    setbrandList(updatedBrandList);

    const updatedProducts = productsList.filter(product => !brandsToDelete.includes(product.selectBrand));
    setproductsList(updatedProducts);
  }


  const editProduct = (item, index) => {
    setformIdproduct(index)
    setselectBrand(item.selectBrand)
    setselectqty(item.selectqty)
    setisUpdateProduct(true)
  }
  const [formIdvendor, setformIdvendor] = useState(0)

  const [isvendorUpdate, setisvendorUpdate] = useState(false)
  const editVendor = (item, index) => {
    setformIdvendor(index)
    setvendorName(item.vendorName)
    setArea(item.Area)
    setAddress(item.Address)
    setisvendorUpdate(true)
  }

  const updateProduct = () => {
    const updatedProducts = [...productsList]
    updatedProducts[formIdproduct] = {
      selectBrand,
      selectqty
    }
    setproductsList(updatedProducts)
    setselectBrand("")
    setselectqty("")
    setisUpdateProduct(false)
  }
  const updateVendor = () => {
    let updatedProducts = [...vendorsList]
    updatedProducts[formIdvendor] = {
      Area,
      Address,
      vendorName
    }
    setvendorsList(updatedProducts)
    setArea("")
    setvendorName("")
    setvendorName("")
    setisvendorUpdate(false)
  }

  const addVendor = () => {
    if (!Area.trim() || !vendorName.trim() || !Address.trim()) {
      alert("All fields are required")
      return
    }
    const vendor = { Area, vendorName, Address }
    setvendorsList([...vendorsList, vendor])
    setArea("")
    setvendorName("")
    setAddress("")
  }

  const qtyChange = (e) => {
    setselectqty(e.target.value)
  }
  const brandChange = (e) => {
    setselectBrand(e.target.value)
  }



  const deleteBrand = (index) => {
    const brandToDelete = brandList.filter(item => item.vendor === selectedVendor)[index].newTask;

    const updatedBrandList = brandList.filter((item, i) => !(item.vendor === selectedVendor && i === index));
    setbrandList(updatedBrandList);

    const updatedProductsList = productsList.filter(product => product.selectBrand !== brandToDelete);
    setproductsList(updatedProductsList);
  }




  return (

    <div style={{ padding: "20px" }}>
      <h2>Vendor Entry</h2>
      <input placeholder='Enter Area' value={Area} onChange={(e) => setArea(e.target.value)} />
      <input placeholder='Enter Vendor Name' value={vendorName} onChange={(e) => setvendorName(e.target.value)} />
      <input placeholder='Enter Address' value={Address} onChange={(e) => setAddress(e.target.value)} />
      {
        !isvendorUpdate ?
          <button className='ButtonInfo' onClick={addVendor}>Add Vendor</button>
          : <button className='ButtonInfo' onClick={updateVendor}>Update </button>

      }

      <h3>Vendors List:</h3>
      <table>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Address</th>
            <th>Area </th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {vendorsList.map((item, index) =>
            <tr key={index} >
              <td>{item.vendorName} </td>
              <td>{item.Address} </td>
              <td>{item.Area} </td>
              <td>
                <button className='ButtonInfo' onClick={() => editVendor(item, index)}  >Edit </button>
                <button className='ButtonInfo' onClick={() => deleteVendor(index)} >Delete </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
        <option value="">-- Select Vendor --</option>
        {vendorsList.map((vendor, i) => (
          <option key={i} value={vendor.vendorName}>
            {vendor.vendorName}
          </option>
        ))}
      </select>
      <div className='' >
        <input placeholder='Brand Name' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        {
          !isUpdate ?
            <button className='ButtonInfo' onClick={addTask} >Add</button>
            : <button className='ButtonInfo' onClick={updateTask} >Update</button>

        }


        {brandList.filter((item) => item.vendor == selectedVendor).map((item, index) =>
          <div key={index} >{item.newTask}
            <button className='p-2 bg-gray-100 cursor-pointer' onClick={() => editTask(item, index)} >Edit</button>
            <button className='p-2 bg-gray-100 cursor-pointer' onClick={() => deleteBrand(index)} >Delete</button>
          </div>
        )}

        <select value={selectBrand} onChange={brandChange} >
          {brandList.filter((item) => item.vendor == selectedVendor).map((item, index) =>
            <option key={index} value={item.newTask}>{item.newTask}</option>)
          }
        </select>
        <select value={selectqty} onChange={qtyChange} >
          <option value="10" >10L </option>
          <option value="20" >20L </option>
          <option value="30" >30L </option>
        </select>
        {
          !isUpdateProduct ?
            <button className='p-2 bg-gray-100 cursor-pointer' onClick={addProduct} >Add</button>
            : <button className='p-2 bg-gray-100 cursor-pointer' onClick={updateProduct} >Update</button>

        }

        {/* {productsList?.map((item, index) =>
          <div key={index} >{item.selectBrand}{" "} {item.selectqty}
            <button className='p-2 bg-gray-100 ' onClick={() => editProduct(item, index)} >Edit</button>
            <button className='p-2 bg-gray-100 ' onClick={() => deleteProduct(index)} >Delete</button>
          </div>
        )
        } */}
        {productsList?.filter((item) => item.vendor == selectedVendor).map((item, index) =>
          <div key={index} >{item.selectBrand}{" "} {item.selectqty}
            <button className='p-2 bg-gray-100 ' onClick={() => editProduct(item, index)} >Edit</button>
            <button className='p-2 bg-gray-100 ' onClick={() => deleteProduct(index)} >Delete</button>
          </div>
        )
        }


      </div >
    </div>
  )
}

export default App