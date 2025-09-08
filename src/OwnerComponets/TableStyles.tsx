// components/TableStyles.tsx
import styled from 'styled-components';

export const StyledTable = styled.table.attrs({
  className: 'w-full mt-10 text-center min-w-full',
})``;

export const TableHeader = styled.thead.attrs({
  className: 'bg-red text-white',
})``;

export const HeaderCell = styled.th.attrs<{
  isFirst?: boolean;
  isLast?: boolean;
}>(({ isFirst, isLast }) => ({
  className: `p-3 font-sans ${isFirst ? 'rounded-tl-lg' : ''} ${isLast ? 'rounded-tr-lg' : ''}`,
}))``;

export const TableRow = styled.tr.attrs<{
  isEven?: boolean;
}>(({ isEven }) => ({
  className: `${isEven ? 'bg-gray-100 rounded-lg' : ''}`,
}))``;

export const TableCell = styled.td.attrs<{
  isFirst?: boolean;
  isLast?: boolean;
}>(({ isFirst, isLast }) => ({
  className: `p-2 ${isFirst ? 'rounded-bl-lg' : ''} ${isLast ? 'rounded-br-lg' : ''}`,
}))``;

export const EditableCell = styled(TableCell).attrs({
  className: 'flex items-center justify-center p-2 rounded-br-lg',
})``;

export const EditButton = styled.button.attrs({
  className: 'p-1 mr-3 bg-gray-200 rounded-full cursor-pointer',
})``;
