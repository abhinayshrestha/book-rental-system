import { Routes, Route } from "react-router-dom";
import Author from "../components/admin/author/author";
import AuthorTable from "../components/admin/author/authorTable";
import BookTransactionTable from "../components/admin/book-transaction/booktransactionTable";
import RentBook from "../components/admin/book-transaction/rent-book";
import ReturnBook from "../components/admin/book-transaction/return-book";
import Book from "../components/admin/book/book";
import BookTable from "../components/admin/book/bookTable";
import Category from "../components/admin/category/category";
import CategoryTable from "../components/admin/category/categoryTable";
import Dashboard from "../components/admin/dashboard";
import Member from "../components/admin/member/member";
import MemberTable from "../components/admin/member/memberTable";
import Login from "../core/Public/Login/Login";
import Register from "../core/Public/Register/Register";
// import { BrowserRouter } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="categoryTable" element={<CategoryTable/>}/>
          <Route path="category" element={<Category/>} />
          <Route path="bookTable" element={<BookTable/>}/>
          <Route path="book" element={<Book/>}/>
          <Route path="authorTable" element={<AuthorTable/>}/>
          <Route path="author" element={<Author/>}/>
          <Route path="memberTable" element={<MemberTable/>}/>
          <Route path="member" element={<Member/>}/>
          <Route path="booktransactionTable" element={<BookTransactionTable/>}/>
          <Route path="book-transaction" element={<div>Book Transaction</div>}/>
          <Route path="rentbook" element={<RentBook/>}/>
          <Route path="returnbook" element={<ReturnBook/>}/>
        </Route>
    </Routes>
  )
}

export default Router;