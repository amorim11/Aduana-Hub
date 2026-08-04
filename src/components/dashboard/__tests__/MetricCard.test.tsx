import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Plane, Ship, Truck } from "lucide-react";
import { MetricCard } from "../MetricCard";

describe("MetricCard", () => {
  it("exibe o rótulo e o valor do modal Aéreo", () => {
    render(<MetricCard label="Aéreo" value={128} icon={Plane} />);

    expect(screen.getByText("Aéreo")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
  });

  it("exibe o rótulo e o valor do modal Marítimo", () => {
    render(<MetricCard label="Marítimo" value={342} icon={Ship} />);

    expect(screen.getByText("Marítimo")).toBeInTheDocument();
    expect(screen.getByText("342")).toBeInTheDocument();
  });

  it("exibe o rótulo e o valor do modal Rodoviário", () => {
    render(<MetricCard label="Rodoviário" value={517} icon={Truck} />);

    expect(screen.getByText("Rodoviário")).toBeInTheDocument();
    expect(screen.getByText("517")).toBeInTheDocument();
  });

  it("formata valores grandes com separador de milhar (pt-BR)", () => {
    render(<MetricCard label="Total Geral" value={1234} icon={Plane} />);

    expect(screen.getByText("1.234")).toBeInTheDocument();
  });

  it("exibe o texto de apoio quando informado", () => {
    render(
      <MetricCard
        label="Aéreo"
        value={128}
        icon={Plane}
        helpText="Documentos averbados"
      />,
    );

    expect(screen.getByText("Documentos averbados")).toBeInTheDocument();
  });
});
