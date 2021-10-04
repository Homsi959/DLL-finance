import { PagedList } from 'components';
import { QuotaCalculationResult, QuotaListViewModel } from 'schema';

export type QuotaListResult = PagedList<QuotaListViewModel>;

export type QuotaProps = {
  quota: QuotaCalculationResult;
};
