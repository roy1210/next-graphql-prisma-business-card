import { gql, GraphQLClient } from "graphql-request";
import React from "react";

export const getServerSideProps = async ({ params }) => {
  const cardId = params.id;
  const endpoint = "http://localhost:3000/api/graphql";
  const graphQLClient = new GraphQLClient(endpoint, {});
  const query = gql`
    query GetCard($id: String!) {
      getCard(id: $id) {
        name
        email
        phone
        biography
        twitter
        github
        website
      }
    }
  `;

  const variables = {
    id: cardId,
  };
  const data = await graphQLClient.request(query, variables);
  const card = data.getCard;
  return {
    props: {
      card,
    },
  };
};

export default function IDPage({ card }) {
  return (
    <div>
      <h1>{card.name}</h1>
    </div>
  );
}
