
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ViewOrders from './components/ViewOrders';
import ViewApprovedOrders from './components/ViewApprovedOrders';
import DivideOrders from './components/DivideOrders';
import ViewAccounts from './components/ViewAccounts';
import Invoices from './components/Invoices';
import Payment from './components/Payment';
import ViewSuppliers from './components/ViewSuppliers';
import ViewSuppliersEditAddId from './components/ViewSuppliersEditAddId';
import ViewRegisteredSuppliers from './components/ViewRegisteredSuppliers';
import SitesAdd from './components/SitesAdd';
import SitesView from './components/SitesView';
import SitesEdit from './components/SitesEdit';
import ItemsAdd from './components/ItemAdd';
import ItemsEdit from './components/ItemEdit';
import ItemsView from './components/ItemView';


function App() {
  const { darkMode } = useContext(DarkModeContext);
 
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={   <Home />} />
        <Route path="/vieworders" element={   <ViewOrders />} />
        <Route path="/vieworders/edits/:id" element={<DivideOrders />} />
       
        <Route path="/viewapprovedorders" element={<ViewApprovedOrders />} />
        <Route path="/viewaccounts" element={<ViewAccounts />} />
        <Route path="/viewaccounts/edits/:id" element={<Payment />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/suppliers" element={<ViewSuppliers />} />
        <Route path="/registeredsuppliers" element={<ViewRegisteredSuppliers />} />
        <Route path="/suppliers/edits/:id" element={<ViewSuppliersEditAddId />} />
        <Route path="/suppliers" element={<ViewSuppliers />} />
        <Route path="/items" element={<ItemsAdd />} />
        <Route path="/items/edits/:id" element={<ItemsEdit />} />
        <Route path="/registereditems" element={<ItemsView />} />
        <Route path="/sites" element={<SitesAdd />} />
        <Route path="/sites/edits/:id" element={<SitesEdit />} />
        <Route path="/siteview" element={<SitesView />} />
        
             
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;