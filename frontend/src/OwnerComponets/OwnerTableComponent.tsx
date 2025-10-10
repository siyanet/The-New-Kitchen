


import styled from 'styled-components';

// Styled components using Tailwind CSS classes
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

const EditableCell = styled(TableCell).attrs({
  className: 'flex items-center justify-center p-2 rounded-br-lg',
})``;

const EditButton = styled.button.attrs({
  className: 'p-1 mr-3 bg-gray-200 rounded-full cursor-pointer',
})``;

// TypeScript interfaces
interface RowData {
  id: number | string;
  [key: string]: any;
}

interface OwnerTableProps {
  headers: string[];
  rows: RowData[];
  isEditable?: boolean;
  isActivable?: boolean;
  onEdit?: (row: RowData) => void;
  onStatusChange?: (id: string | number, active: boolean) => void;
}

const OwnerTableComponent: React.FC<OwnerTableProps> = ({
  headers,
  rows,
  isEditable = false,
  isActivable = false,
  onEdit,
  onStatusChange,
}) => {
  return (
    <StyledTable>
      <TableHeader>
        <tr>
          {headers.map((header, index) => (
            <HeaderCell
              key={index}
              isFirst={index === 0}
              isLast={index === headers.length - 1}
            >
              {header}
            </HeaderCell>
          ))}
        </tr>
      </TableHeader>

      <tbody>
        {rows.map((row, rowIndex) => (
          <TableRow key={row.id} isEven={rowIndex % 2 !== 0}>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                isFirst={index === 0}
                isLast={index === headers.length - 1 && !isEditable}
              >
                {row[header]}
              </TableCell>
            ))}
            {isEditable && (
              <EditableCell>
                <EditButton onClick={() => onEdit?.(row)}>
                  <i className="text-black fas fa-edit" />
                </EditButton>
                {isActivable && (
                  <input
                    type="checkbox"
                    onChange={(e) => onStatusChange?.(row.id, e.target.checked)}
                    checked={row.isActive || false}
                  />
                )}
              </EditableCell>
            )}
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default OwnerTableComponent;
