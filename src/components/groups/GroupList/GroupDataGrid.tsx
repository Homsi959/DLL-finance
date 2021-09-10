import { Link } from 'react-router-dom';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { DataGrid } from 'components';
import { GroupOwnersViewModel } from '../types';
import { useMemo } from 'react';

export interface GroupDataGridProps {
  groups: GroupOwnersViewModel[];
  loading: boolean;
}

const useColumns = () => {
  const { t } = useTranslation();
  const group = t('Group');
  const owner = t('Owner');
  return useMemo(() => {
    const columns: GridColumns = [
      {
        field: 'name',
        headerName: group,
        flex: 1,
        renderCell: (params: any) => {
          const name = params.value as number;
          const id = params.id as number;
          const groupUrl = `groups/${id}`;
          return <Link to={`${groupUrl}`}>{name}</Link>;
        },
      },
      {
        field: 'owners',
        headerName: owner,
        flex: 3,
        renderCell: (params: any) => {
          const owners = params.value as GroupOwnersViewModel[];
          return owners.map((t) => t.name).join(', ');
        },
      },
    ];
    return columns;
  }, [group, owner]);
};

export const GroupDataGrid = (props: GroupDataGridProps) => {
  const { groups = [], loading } = props;
  const columns = useColumns();
  const gridProps = {
    rows: groups,
    columns,
    loading,
    rowHeight: 46,
  };

  return <DataGrid {...gridProps} />;
};
