import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { NavBar, Home, Auth, PostDetails } from "./components";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  const User = !user ? <Auth /> : <Navigate to="/posts" />;
  return (
    <Container maxWidth="2xl">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={User} />
      </Routes>
    </Container>
  );
}

export default App;
