import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import FindEmail from "../pages/FindEmail";
import Account from "../pages/Account";
import JobPostDetail from "../pages/JobPostDetail";
import UserMypage from "../pages/UserMypage";
import CompanyMypage from "../pages/CompanyMypage";
import CreateResume from "../pages/CreateResume";
import CreateJobPost from "../pages/CreateJobPost";
import ViewResume from "../pages/ViewResume";
import RecruitBoard from "../pages/RecruitBoard";
import ProtectedRoute from "../pages/ProtectedRoute";
import Layout from "../pages/Layout";
import FormAssignment from "../pages/FormAssignment";
import FormInterview from "../pages/FormInterview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/find-email",
        element: <FindEmail />,
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-mypage",
        element: (
          <ProtectedRoute>
            <UserMypage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company-mypage",
        element: (
          <ProtectedRoute>
            <CompanyMypage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-resume",
        element: (
          <ProtectedRoute>
            <CreateResume />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-resume/:candidateKey",
        element: (
          <ProtectedRoute>
            <ViewResume />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-jobpost",
        element: (
          <ProtectedRoute>
            <CreateJobPost />
          </ProtectedRoute>
        ),
      },
      {
        // path: "/recruit-board/:recruitId",
        path: "/recruit-board",
        element: (
          <ProtectedRoute>
            <RecruitBoard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            path: "/recruit-board/assignment",
            element: (
              <ProtectedRoute>
                <FormAssignment />
              </ProtectedRoute>
            ),
          },
          {
            path: "/recruit-board/interview",
            element: (
              <ProtectedRoute>
                <FormInterview />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/jobpost-detail/:jobPostingKey",
        element: <JobPostDetail />,
      },
    ],
  },
]);

export default router;
