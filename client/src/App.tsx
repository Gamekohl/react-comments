import PostLists from "./components/PostLists";
import { Route, Routes } from 'react-router-dom';
import { PostProvider } from "./contexts/PostContext";
import Post from "./components/Post";

const App = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostLists />} />
          <Route path="/posts/:id" element={<PostProvider><Post /></PostProvider>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
