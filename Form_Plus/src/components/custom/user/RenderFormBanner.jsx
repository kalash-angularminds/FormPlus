import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

function RenderFormBanner({title, description}) {
  return (
      <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              {title}
          </h1>
          <p className="mb-4">{ description}</p>
      </div>
  )
}

export default RenderFormBanner