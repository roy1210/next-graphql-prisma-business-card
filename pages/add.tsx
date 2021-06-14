import { gql, GraphQLClient } from "graphql-request";
import { useForm } from "react-hook-form";

export default function Add() {
  const { register, handleSubmit, reset } = useForm();

  const items = [
    "name",
    "email",
    "phone",
    "biography",
    "twitter",
    "github",
    "website",
  ];

  async function onFormSubmit(values) {
    const endpoint = "/api/graphql";
    const graphQLClient = new GraphQLClient(endpoint);
    const mutation = gql`
      mutation AddCard($input: CardInput!) {
        addCard(input: $input) {
          name
          id
        }
      }
    `;

    const variables = {
      input: values,
    };

    try {
      const data = await graphQLClient.request(mutation, variables);
      console.log("data", data);
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <main className="flex justify-center w-full min-h-screen items-center bg-gray-100">
        <div className="w-1/2 bg-white flex justify-center items-center rounded-full">
          <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              {items.map((item) => (
                <div key={item}>
                  <label htmlFor="name">
                    {item}
                    <input
                      {...register(item, { required: true })}
                      className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 mb-3"
                      id={item}
                      type="text"
                    />
                  </label>
                </div>
              ))}
              <button
                className="bg-green-500 px-3 py-1 mt-10 py-1 rounded-md text-white mb-2"
                type="submit">
                Add card
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
