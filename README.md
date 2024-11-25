# **Cryptocurrency Portfolio Tracker**

This project is a cryptocurrency portfolio tracker built using **React**, **TypeScript**, and **Vite**. It enables users to view market data, manage their cryptocurrency portfolios, and set price alerts for specific cryptocurrencies. The application is designed with a responsive, neo-brutalist aesthetic, leveraging modern web technologies.

---

## **Features**

- **Market Data**: View top cryptocurrencies with real-time data.
- **Portfolio Management**: Add and track your cryptocurrency holdings.
- **Price Alerts**: Set and manage alerts for specific cryptocurrency prices.
- **Modern Design**: Responsive UI styled with a neo-brutalist theme.
- **Tech Stack**: Built using React, TypeScript, Tailwind CSS, and Vite for performance and maintainability.

---

## **Project Structure**

```plaintext
.
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── components/
│   │   ├── AssetCard.tsx
│   │   ├── MarketOverview.tsx
│   │   ├── Portfolio.tsx
│   │   ├── PriceAlert.tsx
│   │   ├── PriceChart.tsx
│   │   ├── SearchAndFilter.tsx
│   │   ├── ui/
│   │       ├── [UI components like buttons, forms, and dialogs]
│   ├── hooks/
│   │   ├── use-toast.ts
│   ├── lib/
│   │   ├── api.ts
│   │   ├── utils.ts
│   │   ├── redis.ts
│   ├── pages/
│   │   ├── AssetDetails.tsx
│   │   ├── Index.tsx
│   ├── main.tsx
│   ├── server.ts
│   ├── vite-env.d.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.app.json
├── vite.config.ts
├── vercel.json
```

---

## **Getting Started**

### **Prerequisites**

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **Redis** (for caching)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Start the backend server**:
   ```bash
   npm run start:server
   # or
   yarn start:server
   ```

---

## **Integrating the Frontend with the Backend**

To integrate the backend API with the frontend, follow these steps:

1. **Ensure the backend API is running and accessible**. The backend API endpoints are defined in the controllers such as `src/controllers/marketDataController.ts`, `src/controllers/portfolioController.ts`, and `src/controllers/priceAlertController.ts`.

2. **Use the `axios` library to make HTTP requests to the backend API**. The `axios` instance is already configured in `src/lib/api.ts`.

3. **Use React Query to manage the data fetching and caching**. The `QueryClient` and `QueryClientProvider` are set up in `src/App.tsx`.

4. **Create custom hooks or functions to fetch data from the backend API**. For example, `getTopAssets`, `getAssetHistory`, and `getAssetDetails` are defined in `src/lib/api.ts`.

5. **Use these hooks or functions in your React components to fetch and display data**. For example, the `MarketOverview` component in `src/components/MarketOverview.tsx` uses the `useQuery` hook to fetch global market data.

6. **Handle errors and loading states appropriately in your components**. For example, the `AssetDetails` component in `src/pages/AssetDetails.tsx` shows a loading message while fetching data and displays an error message if the fetch fails.

7. **Ensure the frontend and backend are properly connected by testing the integration and verifying that data is being fetched and displayed correctly**.

---

## **Linting**

To ensure code quality, run the linter:

```bash
npm run lint
# or
yarn lint
```

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.

---

## **Acknowledgements**

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Radix UI**
- **React Query**
- **CoinCap API**

---

## **Contributing**

Contributions are welcome! Feel free to:

- Open an issue for bugs or feature requests.
- Submit a pull request with your improvements.

---

This documentation is clean and user-friendly. Let me know if you'd like further customizations or additions, such as screenshots, examples, or detailed component explanations! 🚀
