import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import { Profile } from "./pages/profile";
import { Writing } from "./pages/writing";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { Badge } from "./pages/badge";
import { Chating } from "./pages/chating";
import { NotFound } from "./pages/notFound";
import { Starting } from "./pages/starting";
import { Detail } from "./pages/detail";
import { AlertProvider } from "./context/alertContext";
import { ChangePassword } from "./pages/changePassword";
import PostEdit from "./pages/postEdit";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Starting />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/write" element={<Writing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/badge" element={<Badge />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="/chating" element={<Chating />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/postEdit" element={<PostEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
