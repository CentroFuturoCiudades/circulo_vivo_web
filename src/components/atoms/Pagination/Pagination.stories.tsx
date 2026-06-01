import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Atoms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const Controlled = ({ totalPages, initialPage = 1 }: { totalPages: number; initialPage?: number }) => {
  const [page, setPage] = useState(initialPage);
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <span className="font-sans text-[11px] text-neutral-400">Página {page} de {totalPages}</span>
    </div>
  );
};

export const FewPages: Story = { render: () => <Controlled totalPages={5} initialPage={3} /> };
export const ManyPages: Story = { render: () => <Controlled totalPages={20} initialPage={8} /> };
export const FirstPage: Story = { render: () => <Controlled totalPages={10} initialPage={1} /> };
export const LastPage: Story = { render: () => <Controlled totalPages={10} initialPage={10} /> };
export const TwoPages: Story = { render: () => <Controlled totalPages={2} initialPage={1} /> };
