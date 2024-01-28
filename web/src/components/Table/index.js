import { Table } from 'rsuite';
const { HeaderCell , Column, Cell} = Table;

const TableComponent = ({ data, config, actions, content, loading, onRowClick }) => {
    return(
    <Table loading={loading} data={data} height={400} onRowClick={onRowClick}>
        {config.map((c) => (
            <Column key={c.label} flexGrow={!c.width ? 1 : 0} width={c.width} fixed={c.fixed}>
                <HeaderCell>{c.label}</HeaderCell>
                {!c.content ? <Cell dataKey={c.key} /> : <Cell>{(item) => c.content(item)}</Cell>}
            </Column>
        ))}
                {actions && (
                    <Column width={150} fixed="right">
                        <HeaderCell>Ações</HeaderCell>
                        <Cell>{(item) => actions(item)}</Cell>
                    </Column>
                )}
    </Table>
    );
};

export default TableComponent;