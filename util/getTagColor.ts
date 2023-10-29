import { Filter } from './filters';

export const DISABLED_BG_COLOR = 'bg-white border-slate-200';
export const DISABLED_TEXT_COLOR = 'text-slate-400';

export const INACTIVE_BG_COLOR = 'bg-white border-slate-200';
export const INACTIVE_TEXT_COLOR = 'text-slate-700';

export const ACTIVE_BG_COLOR = 'bg-blue-50 border-blue-200';
export const ACTIVE_TEXT_COLOR = 'text-blue-600';

export const EXPIRED_BG_COLOR = 'bg-red-50 border-red-200';
export const EXPIRED_TEXT_COLOR = 'text-red-600';

export const LEFT_3_DAYS_BG_COLOR = 'bg-amber-50 border-amber-200';
export const LEFT_3_DAYS_TEXT_COLOR = 'text-amber-600';

export const LEFT_WEEK_BG_COLOR = 'bg-green-50 border-green-200 ';
export const LEFT_WEEK_TEXT_COLOR = 'text-green-600';

const activeBgColorByFilter = (filter: Filter) => {
  return filter === '소비기한 일주일 이내'
    ? LEFT_WEEK_BG_COLOR
    : filter === '소비기한 3일 이내'
    ? LEFT_3_DAYS_BG_COLOR
    : filter === '소비기한 만료'
    ? EXPIRED_BG_COLOR
    : ACTIVE_BG_COLOR;
};

const activeTextColorByFilter = (filter: Filter) => {
  return filter === '소비기한 일주일 이내'
    ? LEFT_WEEK_TEXT_COLOR
    : filter === '소비기한 3일 이내'
    ? LEFT_3_DAYS_TEXT_COLOR
    : filter === '소비기한 만료'
    ? EXPIRED_TEXT_COLOR
    : ACTIVE_TEXT_COLOR;
};

export const getTagColor = (
  filter: Filter,
  active: boolean,
  type?: 'bg' | 'text',
  length?: number
) => {
  if (type === 'text') {
    return active
      ? activeTextColorByFilter(filter)
      : length === 0
      ? DISABLED_TEXT_COLOR
      : INACTIVE_TEXT_COLOR;
  }

  return active
    ? activeBgColorByFilter(filter)
    : length === 0
    ? DISABLED_BG_COLOR
    : INACTIVE_BG_COLOR;
};