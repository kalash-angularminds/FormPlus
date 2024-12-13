import RootLayout from '@/layouts/RootLayout';
import CreateForm from '@/pages/CreateForm';
import Dashboard from '@/pages/Dashboard';
import { Example } from '@/pages/Example';
import FormPreview from '@/pages/FormPreview';
import Form from '@/pages/user/Form';
import React from 'react'
import { Routes, Route } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<RootLayout />} />  */}

      <Route path="/" element={<Dashboard />} />
      <Route path="/form/:id" element={<Form />} />
      <Route path="/form/create-form" element={<Example />} />
      {/* <Route path="/form/update/:id" element={<UpdateForm />} /> */}
      {/* <Route path="/form/response/:id" element={<FormResponses />} /> */}
      <Route path="/form/preview/:id" element={<FormPreview />} />
      <Route path="/test" element={<Example />} />
      <Route path="*" element={<Dashboard />} />


    </Routes>
  )
}

export default AppRoutes