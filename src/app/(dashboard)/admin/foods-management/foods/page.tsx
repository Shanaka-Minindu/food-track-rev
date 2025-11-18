import React from 'react'

import FoodFiltersDrawer from './_components/food-filters-drawer'
import FoodCards from './_components/food-cards'
import { FoodFormDialog } from './_components/food-form-dialog'

const page = () => {
  return (
    <div className='space-y-2'>
        <div className='mb-6 flex items-center justify-between'>
            <h1 className='text-3xl font-semibold'>Foods List</h1>
            <FoodFormDialog/>
        </div>
      <FoodFiltersDrawer/>
      <FoodCards/>
    </div>
  )
}

export default page
