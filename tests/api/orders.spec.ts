import testData from '../../src/data/api-test-data.json';
import { expect, test } from '../../src/fixtures/testFixtures';
import { generateUniqueEmail } from '../../src/utils/randomData';

interface RegisterClientResponse {
  accessToken: string;
}

interface CreateOrderResponse {
  created: boolean;
  orderId: string;
}

interface GetOrderResponse {
  id: string;
  bookId: number;
  customerName: string;
}

let accessToken = '';
let orderId = '';

test.describe('Simple Books API - Orders', () => {
  test.describe.configure({ mode: 'serial' });

  test(
    'TC_API_001 - Authenticate Client and Create New Book Order',
    async ({ simpleBooksApi }) => {
      const registerClientResponse =
        await simpleBooksApi.registerClient({
          clientName: testData.client.name,
          clientEmail: generateUniqueEmail()
        });

      expect(registerClientResponse.status()).toBe(201);

      const registerClientBody =
        (await registerClientResponse.json()) as RegisterClientResponse;

      expect(registerClientBody.accessToken).toEqual(
        expect.any(String)
      );
      expect(registerClientBody.accessToken.length).toBeGreaterThan(0);

      accessToken = registerClientBody.accessToken;

      const createOrderResponse =
        await simpleBooksApi.createOrder(accessToken, {
          bookId: testData.order.bookId,
          customerName: testData.order.customerName
        });

      expect(createOrderResponse.status()).toBe(201);

      const createOrderBody =
        (await createOrderResponse.json()) as CreateOrderResponse;

      expect(createOrderBody.created).toBe(true);
      expect(createOrderBody.orderId).toEqual(expect.any(String));
      expect(createOrderBody.orderId.length).toBeGreaterThan(0);

      orderId = createOrderBody.orderId;
    }
  );

  test(
    'TC_API_002 - Retrieve Details of the Newly Created Order',
    async ({ simpleBooksApi }) => {
      expect(accessToken).not.toBe('');
      expect(orderId).not.toBe('');

      const getOrderResponse = await simpleBooksApi.getOrder(
        accessToken,
        orderId
      );

      expect(getOrderResponse.status()).toBe(200);

      const getOrderBody =
        (await getOrderResponse.json()) as GetOrderResponse;

      expect(getOrderBody.id).toBe(orderId);
      expect(getOrderBody.bookId).toBe(testData.order.bookId);
      expect(getOrderBody.customerName).toBe(
        testData.order.customerName
      );
    }
  );

  test(
    'TC_API_003 - Update Customer Name on Existing Order',
    async ({ simpleBooksApi }) => {
      expect(accessToken).not.toBe('');
      expect(orderId).not.toBe('');

      const updateOrderResponse =
        await simpleBooksApi.updateOrder(
          accessToken,
          orderId,
          {
            customerName: testData.order.updatedCustomerName
          }
        );

      expect(updateOrderResponse.status()).toBe(204);

      const getUpdatedOrderResponse =
        await simpleBooksApi.getOrder(accessToken, orderId);

      expect(getUpdatedOrderResponse.status()).toBe(200);

      const updatedOrderBody =
        (await getUpdatedOrderResponse.json()) as GetOrderResponse;

      expect(updatedOrderBody.id).toBe(orderId);
      expect(updatedOrderBody.bookId).toBe(
        testData.order.bookId
      );
      expect(updatedOrderBody.customerName).toBe(
        testData.order.updatedCustomerName
      );
    }
  );

  test(
    'TC_API_004 - Delete Existing Order and Verify Not Found',
    async ({ simpleBooksApi }) => {
      expect(accessToken).not.toBe('');
      expect(orderId).not.toBe('');

      const deleteOrderResponse =
        await simpleBooksApi.deleteOrder(accessToken, orderId);

      expect(deleteOrderResponse.status()).toBe(204);

      const getDeletedOrderResponse =
        await simpleBooksApi.getOrder(accessToken, orderId);

      expect(getDeletedOrderResponse.status()).toBe(404);
    }
  );
});
