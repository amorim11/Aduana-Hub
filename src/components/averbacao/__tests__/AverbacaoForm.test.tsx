import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AverbacaoForm } from "../AverbacaoForm";

describe("AverbacaoForm", () => {
  it("inicia com o botão de envio desabilitado (campos obrigatórios pendentes)", () => {
    render(<AverbacaoForm onSubmit={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /enviar para averbação/i }),
    ).toBeDisabled();
  });

  it("mostra os campos da DUIMP por padrão", () => {
    render(<AverbacaoForm onSubmit={vi.fn()} />);

    expect(screen.getByText(/pdf da duimp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número da duimp/i)).toBeInTheDocument();
    expect(screen.queryByText(/pdf da di/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/número da di/i)).not.toBeInTheDocument();
  });

  it("troca para os campos da DI ao selecionar esse tipo de processo", async () => {
    const user = userEvent.setup();
    render(<AverbacaoForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("radio", { name: "DI" }));

    expect(screen.getByText(/pdf da di/i)).toBeInTheDocument();
    expect(screen.getByText(/xml da di/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número da di/i)).toBeInTheDocument();
    expect(screen.queryByText(/pdf da duimp/i)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/número da duimp/i),
    ).not.toBeInTheDocument();
  });

  it("volta a mostrar os campos da DUIMP ao selecionar DUIMP novamente", async () => {
    const user = userEvent.setup();
    render(<AverbacaoForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("radio", { name: "DI" }));
    await user.click(screen.getByRole("radio", { name: "DUIMP" }));

    expect(screen.getByText(/pdf da duimp/i)).toBeInTheDocument();
    expect(screen.queryByText(/pdf da di/i)).not.toBeInTheDocument();
  });
});
