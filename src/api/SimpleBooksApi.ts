import type {
  APIRequestContext,
  APIResponse
} from '@playwright/test';

interface RegisterClientRequest {
  clientName: string;
  clientEmail: string;
}

interface CreateOrderRequest {
  bookId: number;
  customerName: string;
}

interface UpdateOrderRequest {
  customerName: string;
}

export class SimpleBooksApi {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerClient(
    clientData: RegisterClientRequest
  ): Promise<APIResponse> {
    return this.request.post('/api-clients/', {
      data: clientData
    });
  }

  async createOrder(
    accessToken: string,
    orderData: CreateOrderRequest
  ): Promise<APIResponse> {
    return this.request.post('/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: orderData
    });
  }

  async getOrder(
    accessToken: string,
    orderId: string
  ): Promise<APIResponse> {
    return this.request.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  async updateOrder(
    accessToken: string,
    orderId: string,
    orderData: UpdateOrderRequest
  ): Promise<APIResponse> {
    return this.request.patch(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: orderData
    });
  }

  async deleteOrder(
    accessToken: string,
    orderId: string
  ): Promise<APIResponse> {
    return this.request.delete(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
