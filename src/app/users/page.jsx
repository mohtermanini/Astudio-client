import React from 'react'

import BreadCrumb from '@/common/components/ui/Navigation/BreadCrumb';
import { APP_PAGES } from '@/common/config/app-pages';
import FiltersProvider from '@/common/contexts/FiltersProvider';
import PaginationProvider from '@/common/contexts/PaginationProvider';
import UsersPageBody from './_components/UsersPageBody';

export default function UsersPage() {

    return (
        <div className='p-4'>
            <BreadCrumb items={[{ title: "Home", link: APP_PAGES.Home.Index.path() }, { title: "Users" }]} />

            <FiltersProvider>
                <PaginationProvider>
                    <UsersPageBody />
                </PaginationProvider>
            </FiltersProvider>
        </div>
    )
}
