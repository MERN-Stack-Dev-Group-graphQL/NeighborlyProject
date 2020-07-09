import React, { Fragment /* , useState */ } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_TOOLS_BY_ID_QUERY } from '../../../../util/graphql';
// import { Link } from 'react-router-dom';
import ToolDetail from './ToolDetail';

function ToolDetailPage({
  match: {
    params: { toolId },
  },
}) {
  // const [count, setCount] = useState(0);
  const { data, loading, error } = useQuery(FETCH_TOOLS_BY_ID_QUERY, {
    variables: { toolId },
  });

  let starCount = 4;
  let rateCount = 252;

  // <Loading />
  if (loading) return <h3>Loading</h3>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      {loading && (
        <div>
          loading tool detail for tool ID: <strong>{toolId}</strong>
        </div>
      )}
      {error && <div style={{ color: `red` }}>some error occurred, while fetching api</div>}
      {data && <ToolDetail {...data.getToolById} starCount={starCount} rateCount={rateCount} />}
    </Fragment>
  );
}
export default ToolDetailPage;
