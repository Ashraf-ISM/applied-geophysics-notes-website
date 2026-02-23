import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== Pages ===== */
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectDetailPage from "./pages/SubjectDetailPage";

import MaterialsPage from "./pages/MaterialsPage";
import LoginPage from "./pages/LoginPage";
import ISMLibraryPage from "./pages/ISMLibraryPage";
import AboutPage from "./pages/AboutPage";

import PYQPage from "./pages/PYQPage";
import ExamPYQPage from "./pages/ ExamPYQPage";
import SemesterPYQPage from "./pages/SemesterPYQPage";
import NotFound from "./pages/NotFound";


/* ===== Auth Guards ===== */
import RequireAuth from "./components/auth/RequireAuth";
import RequireAdmin from "./components/auth/RequireAdmin";

/* ===== Admin Pages ===== */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUpload from "./pages/admin/AdminUpload";
// books
import BooksPage from "./pages/BooksPage";
import BookCategoryPage from "./pages/BookCategoryPage";
import SemesterSubjectPYQPage from "./pages/SemesterSubjectPYQPage";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ===== Public Routes ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* ===== PYQ Routes (Public) ===== */}
          <Route path="/pyq/semester/:semId" element={<SemesterSubjectPYQPage />} />
          <Route path="/pyq/:exam" element={<ExamPYQPage />} />
          <Route path="/subject/:id" element={<SubjectDetailPage />} />

          <Route path="/pyq" element={<PYQPage />} />
          <Route path="/pyq/semester" element={<SemesterPYQPage />} />
          <Route path="/pyq/:exam" element={<ExamPYQPage />} />

          {/* ===== Auth Required Routes ===== */}
          <Route
            path="/materials"
            element={
              <RequireAuth>
                <MaterialsPage />
              </RequireAuth>
            }
          />

          <Route
            path="/ism-library"
            element={
              <RequireAuth>
                <ISMLibraryPage />
              </RequireAuth>
            }
          />

          {/* ===== Admin Routes ===== */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/upload"
            element={
              <RequireAdmin>
                <AdminUpload />
              </RequireAdmin>
            }
          />
      

{/* books */}
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:subject" element={<BookCategoryPage />} />
          {/* ===== Catch-all ===== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
