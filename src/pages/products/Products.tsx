import { FC, useEffect, useState } from 'react';
import { LegacyCard, IndexTable, useIndexResourceState, Button, Badge, IndexFilters, Select, IndexFiltersMode } from '@shopify/polaris';
import styles from './style.module.scss'
import { PlusIcon } from '@shopify/polaris-icons';
import img1 from '../../assets/images/product-01.jfif'
import img2 from '../../assets/images/product-02.jfif'
import img3 from '../../assets/images/product-03.jfif'
import img4 from '../../assets/images/product-04.jfif'
import img5 from '../../assets/images/product-05.jfif'
import img6 from '../../assets/images/product-06.jfif'
import img7 from '../../assets/images/product-07.jfif'
import img8 from '../../assets/images/product-08.jfif'
import img9 from '../../assets/images/product-09.jfif'
import img10 from '../../assets/images/product-10.jfif'
import { TProduct } from '../../models/product';
import ProductModal from '../../components/ProductModal/ProductModal';

export const Products: FC = () => {
  const orders = [
    {
      id: '1',
      image: img1,
      title: 'Benjamin Bookcase',
      rules: [
        {
          title: 'Rules 1',
          start: '2024-07-08',
          end: '2024-10-08',
          buyFrom: 100000,
          buyTo: 200000,
          discount: 0.15,
        },
      ],
      lastUpdate: '08-12-2023 15:52:18',
      status: 'Active',
      action: 'Add',
    },
    {
      id: '2',
      image: img2,
      title: 'Classic Chair',
      rules: [],
      lastUpdate: '09-12-2023 10:30:22',
      status: 'No rules',
      action: 'Add',
    },
    {
      id: '3',
      image: img3,
      title: 'Modern Sofa',
      rules: [
        {
          title: 'Rules 2',
          start: '2024-01-01',
          end: '2024-03-01',
          buyFrom: 50000,
          buyTo: 150000,
          discount: 0.1,
        },
        {
          title: 'Rules 3',
          start: '2024-03-02',
          end: '2024-05-01',
          buyFrom: 80000,
          buyTo: 180000,
          discount: 0.12,
        },
      ],
      lastUpdate: '10-12-2023 12:15:45',
      status: 'Active',
      action: 'Add',
    },
    {
      id: '4',
      image: img4,
      title: 'Wooden Desk',
      rules: [],
      lastUpdate: '11-12-2023 09:52:18',
      status: 'No rules',
      action: 'Add',
    },
    {
      id: '5',
      image: img5,
      title: 'Metal Bed Frame',
      rules: [
        {
          title: 'Rules 4',
          start: '2024-05-01',
          end: '2024-08-01',
          buyFrom: 200000,
          buyTo: 400000,
          discount: 0.2,
        },
        {
          title: 'Rules 5',
          start: '2024-08-02',
          end: '2024-12-01',
          buyFrom: 250000,
          buyTo: 450000,
          discount: 0.22,
        },
        {
          title: 'Rules 6',
          start: '2025-01-01',
          end: '2025-03-01',
          buyFrom: 300000,
          buyTo: 500000,
          discount: 0.25,
        },
      ],
      lastUpdate: '12-12-2023 16:02:00',
      status: 'Active',
      action: 'Add',
    },
    {
      id: '6',
      image: img6,
      title: 'Glass Coffee Table',
      rules: [],
      lastUpdate: '13-12-2023 08:00:30',
      status: 'No rules',
      action: 'Add',
    },
    {
      id: '7',
      image: img7,
      title: 'Leather Recliner',
      rules: [
        {
          title: 'Rules 7',
          start: '2024-06-01',
          end: '2024-09-30',
          buyFrom: 150000,
          buyTo: 350000,
          discount: 0.18,
        },
        {
          title: 'Rules 8',
          start: '2024-10-01',
          end: '2024-12-31',
          buyFrom: 160000,
          buyTo: 360000,
          discount: 0.2,
        },
      ],
      lastUpdate: '14-12-2023 14:25:00',
      status: 'Active',
      action: 'Add',
    },
    {
      id: '8',
      image: img8,
      title: 'Fabric Armchair',
      rules: [],
      lastUpdate: '15-12-2023 13:13:13',
      status: 'No rules',
      action: 'Add',
    },
    {
      id: '9',
      image: img9,
      title: 'Outdoor Patio Set',
      rules: [
        {
          title: 'Rules 9',
          start: '2024-02-01',
          end: '2024-04-01',
          buyFrom: 300000,
          buyTo: 500000,
          discount: 0.25,
        },
        {
          title: 'Rules 10',
          start: '2024-04-02',
          end: '2024-06-01',
          buyFrom: 320000,
          buyTo: 550000,
          discount: 0.28,
        },
      ],
      lastUpdate: '16-12-2023 11:45:10',
      status: 'Active',
      action: 'Add',
    },
    {
      id: '10',
      image: img10,
      title: 'Dining Table',
      rules: [],
      lastUpdate: '17-12-2023 17:30:45',
      status: 'No rules',
      action: 'Add',
    },
  ];

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const [data, setData] = useState<TProduct[]>([])
  const [paginatedData, setPaginatedData] = useState<TProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [mode, setMode] = useState<IndexFiltersMode>(IndexFiltersMode.Default);
  const [filterData, setFilterData] = useState<TProduct[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'No rules', value: 'No rules' },
  ];

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const rowMarkup = paginatedData.map(
    (
      { id, image, title, rules, lastUpdate, status },
      index,
    ) => (

      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell className={styles.product}>
          <img src={image} alt='' className={styles.img} />
          <span>{title}</span>
        </IndexTable.Cell>
        <IndexTable.Cell>{rules.length}</IndexTable.Cell>
        <IndexTable.Cell>{lastUpdate}</IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone={status === 'Active' ? 'success' : undefined}>{status}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button
            icon={PlusIcon}
            variant='primary'
          >
            Add rules
          </Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  useEffect(() => {
    setData(orders)
  }, [])

  useEffect(() => {
    let filteredData = data;

    if (searchValue) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter((item) => item.status === statusFilter);
    }

    setFilterData(filteredData);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(filteredData.slice(startIndex, endIndex));
  }, [currentPage, data, statusFilter, searchValue]);

  return (
    <>
      <div style={{ width: '100%' }}>
        <div className={styles.header}>
          <h1 className={styles.title}>Products</h1>
          <Button
            icon={PlusIcon}
            variant='tertiary'
            onClick={() => setIsOpen(true)}
          >
            Add products
          </Button>
        </div>
        <LegacyCard>
          <IndexFilters
            queryValue={searchValue}
            onQueryChange={(value) => setSearchValue(value)}
            onQueryClear={() => setStatusFilter(null)}
            mode={mode}
            setMode={setMode}
            onClearAll={() => setStatusFilter(null)}
            tabs={[]}
            selected={statusFilter ? 1 : 0}
            filters={[
              {
                key: 'status',
                label: 'Status',
                filter: (
                  <Select
                    label="Filter by status"
                    options={statusOptions}
                    onChange={(value) => setStatusFilter(value)}
                    value={statusFilter || ''}
                  />
                ),
              },
            ]}
          />
          <IndexTable
            resourceName={resourceName}
            itemCount={data.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Product' },
              { title: 'Rule(s)' },
              { title: 'Last update' },
              { title: 'Status' },
              { title: '' }
            ]}
            pagination={{
              hasNext: currentPage * pageSize < filterData.length,
              hasPrevious: currentPage > 1,
              onPrevious: () => setCurrentPage(currentPage - 1),
              onNext: () => setCurrentPage(currentPage + 1)
            }}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </div >
      <ProductModal
        title='Add product'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Products;
