"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TreeCart,
  TreeCarts,
  Update_Cart,
  UserMessage,
} from "../../../../type";
import { toast } from "sonner";
// Corrected import name if there's a typo
import { Treecartdata } from "./TreeSliec";
// Define a service using a base URL and expected endpoints
export const CartApi = createApi({
  reducerPath: "CartAPI",
  tagTypes: ["Cart"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/Cart" }),
  endpoints: (builder) => ({
    getCartItemById: builder.query<TreeCarts[], string>({
      query: (id) => ({
        url: `/Mycarttree?Id=${id}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(Treecartdata(data));
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      },
      providesTags: ["Cart"],
    }),
    AddCart: builder.mutation<UserMessage, TreeCart>({
      query: (Cart_data) => ({
        url: `/Addtree`,
        method: "POST",
        body: Cart_data,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast(data.message);
        } catch (error: any) {
          console.error("Error adding cart item:", error);
          toast(error.message);
        }
      },
    }),
    RemoveCart: builder.mutation<UserMessage, Update_Cart>({
      query: ({ _id, UserId, ...rest }) => ({
        url: `/Removetree?Id=${_id}&UserId=${UserId}`,
        method: "DELETE",
        body: rest,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast(data.message);
        } catch (error: any) {
          console.error("Error removing cart item:", error);
          toast(error.message);
        }
      },
    }),
  }),
});

export const {
  useGetCartItemByIdQuery,
  useAddCartMutation,
  useRemoveCartMutation,
} = CartApi;
