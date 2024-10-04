import React from 'react'

import BreadCrumb from '@/common/components/ui/Navigation/BreadCrumb';
import { APP_PAGES } from '@/common/config/app-pages';
import FiltersProvider from '@/common/contexts/FiltersProvider';
import PaginationProvider from '@/common/contexts/PaginationProvider';
import ProductsPageBody from './_components/ProductsPageBody';

export default function ProductsPage() {

  return (
    <div className='p-4'>
      <BreadCrumb items={[{ title: "Home", link: APP_PAGES.Home.Index.path() }, { title: "Products" }]} />

      <FiltersProvider>
        <PaginationProvider>
          <ProductsPageBody />
        </PaginationProvider>
      </FiltersProvider>
    </div>
  )
}
