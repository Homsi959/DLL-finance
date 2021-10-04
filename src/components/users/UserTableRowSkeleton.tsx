import Skeleton from '@material-ui/lab/Skeleton';

export const UserTableRowSkeleton = () => {
  return (
    <tr>
      <td>
        <Skeleton width="100%" />
      </td>
      <td>
        <Skeleton width="100%" />
      </td>
      <td>
        <Skeleton width="100%" />
      </td>
      <td>
        <Skeleton width="100%" />
      </td>
      <td>
        <Skeleton width="100%" />
      </td>
    </tr>
  );
};
