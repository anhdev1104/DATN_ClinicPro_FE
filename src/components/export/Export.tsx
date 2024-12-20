import { Menu, Tooltip } from '@mantine/core';
import BaseButton from '../base/button';
import BaseIcon from '../base/BaseIcon';
import { IconDatabaseExport, IconFileSpreadsheet } from '@tabler/icons-react';
import { CSVLink } from 'react-csv';
import { Row } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ExportFileProps<T> {
  rows: Row<T>[];
}
const flattenObject = (obj: any, parentKey = '', result = {} as any) => {
  for (let key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], newKey, result); // Recursive call for nested objects
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};
export const ExportFile = <T,>({ rows }: ExportFileProps<T>) => {
  const excelRow = useMemo(() => rows.map(row => flattenObject(row.original)), [rows]);
  return (
    <Menu withinPortal={false} shadow="md" width={100} position="bottom-end" radius="md">
      <Menu.Target>
        <Tooltip withinPortal={false} label="Xuất File">
          <BaseButton.Icon variant="outline">
            <BaseIcon icon={IconDatabaseExport} />
          </BaseButton.Icon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<BaseIcon icon={IconFileSpreadsheet} />}>
          <CSVLink filename="table.csv" data={excelRow as any[]}>
            Excel
          </CSVLink>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
