import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Book.css";
import axios from "axios";
import Book from "./Book";
import {useNavigate} from 'react-router-dom';
import {Tab } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink } from "react-router-dom";
import {Nav,Form,FormControl,Container,Navbar} from "react-bootstrap";

const Books = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPageNumber] = useState(0)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  const accessToken = localStorage.getItem('token')


  useEffect(() => {
    setError(false)
    setLoading(true)
    setTimeout(() =>{
     
      let cancel
    axios.get(`http://34.245.213.76:3000/articles?page=${page}`,{

     page: page,
      headers: {
				'Content-Type': 'application/json',
        "Authorization" : `Bearer ${accessToken}`
			
    },
    cancelToken: new axios.CancelToken(c => cancel =c)
  })
    .then(res => {
      setArticles(prevArticles =>{
        return [...new Set([...prevArticles, ...res.data.response.docs.map((b) => b)])]
      })
      setHasMore(res.data.response.docs.length > 0)
      setLoading(false)
      setError(false)
    })
    .catch(err => {
      if (axios.isCancel(err)) return
      setLoading(false)
      setError(true)
      
    })
    return () => cancel()
  },1000)
  }, [page])

  function  logOut(){
    localStorage.removeItem('token');
    navigate('/')
    window.location.reload(false);
  }


  const [filter, setFilter] = useState('')
const searchText = (event) => {
  setFilter(event.target.value)
}

let dataSearch = (articles) 
.filter(data => {
  return Object.keys(data).some(key => 
    data[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
    )
    
})
.map((data, index)=>{
  if (articles.length === index + 1) {
    return <div ref={lastBookElementRef} key={data}>
     <div  className="CARD">
   <div class="row cols-md-3 g-4">
    <Book book={data} />
    </div>
    </div>
    </div>
  } else {
    return <div key={data}> <div  className="CARD">
    <div class="row cols-md-3 g-4">
     <Book book={data} />
     </div>
     </div>
     </div>
  }
})

  return (
    <div>
      <header>
      <Navbar  style={{ backgroundColor: "#232F3D" }} position="sticky" expand="lg" >
  <Container fluid >
    <Navbar.Brand style={{color: 'blue'}}> <LibraryBooksOutlinedIcon /> </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll" >
      <Nav
         className="ml-auto"
        navbarScroll
      >
        <Tab LinkComponent={NavLink} to="/books" label="All Articles" textColor="white" style={{color: 'blue'}}/>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={filter}
          onChange={searchText.bind(this)}
          />
      </Form>
      <Nav.Link  onClick={ logOut}  >
        Logout
        </Nav.Link>
    </Navbar.Collapse>
  </Container>
</Navbar>
      </header>
       {error && <div className="load"><h3><b>Loading Error!!.</b></h3></div>}
      <div class="col row  g-5  ">
            <div className="marg">
           {dataSearch}
          </div>
          {loading && <div className="load"><h3><b>Loading...</b></h3></div>}
       </div>
       
    </div>
  );
};

export default Books;