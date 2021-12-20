import axios from "axios";
import React, { useEffect, useState } from "react";
import { University } from "../Models/Common";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Toolbar } from "../components/Toollbar/Toolbar";
import { Input } from "../components/Input/Input";
import { normalize } from "path/posix";
import { GlobalSearch } from "../components/GlobalSearch/GlobalSearch";

export function Home() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filter, setFilter] = useState("");

  //Chamada à API
  async function fetchUniversities() {
    const response = await axios.get(
      "https://api.meuguru.net/global/university"
    );

    //Preenchendo o campo ID com o index do Array
    //Nescessario para a montagem da tabela
    const newResponse = response.data.map((value: University, id: number) => {
      return { ...value, id };
    });
    setUniversities(newResponse);
  }

  //Tratando o efeito colateral de chamadas infinitas à API
  useEffect(() => {
    fetchUniversities();
    // if (filter === "") {
      
    // }
  }, [universities]);

  //Busca Global
  useEffect(() => {
    const lowerCase = filter.toLowerCase();

    var foundedNames = universities.filter((university) => {
      return university.Name.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(lowerCase);
    });

    var foundedInitials = universities.filter((university) => {
      return university.Initial.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(lowerCase);
    });

    var foundedRegion = universities.filter((university) => {
      return university.Region.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(lowerCase);
    });

    var foundedState = universities.filter((university) => {
      return university.State.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(lowerCase);
    });

    var foundedRegionType = universities.filter((university) => {
      return university.RegionType.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(lowerCase);
    });

    var foundedType = universities.filter((university) => {
      return university.Type.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(lowerCase);
    });

    //Unindo Todos os resultados por campo em um unico resultado geral
    const search = [
      ...foundedNames,
      ...foundedInitials,
      ...foundedRegion,
      ...foundedState,
      ...foundedRegionType,
      ...foundedType,
    ];

    var mergedSearch = search.filter(onlyUnique);

    console.log("merge", mergedSearch)
    
    setUniversities(mergedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //Removendo termos duplicados na busca
    function onlyUnique(value: any, index: any, self: any) {
      return self.indexOf(value) === index;
    }
  }, [filter]);

  //Mock do cabeçalho da tabela
  //POde ser alterado para receber o resultado de uma API contendo o cabeçalho
  const tableHead: GridColDef[] = [
    {
      field: "Name",
      headerName: "Nome",
      width: 550,
    },
    {
      field: "Initial",
      headerName: "Rubrica",
      flex: 50,
    },
    {
      field: "Region",
      headerName: "Região",
      // flex: 50,
    },
    {
      field: "State",
      headerName: "Estado",
      // width: 80,
    },
    {
      field: "RegionType",
      headerName: "Tipo de Região",
      width: 150,
    },
    {
      field: "Type",
      headerName: "Tipo",
      // width: 100,
    },
  ];

  console.log("filter", filter);
  return (
    <>
      <GlobalSearch>
        <Input
          type="text"
          placeholder="Buscar"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </GlobalSearch>
      <div style={{ display: "flex" }}>
        <div style={{ height: "90vh", width: "100%" }}>
          <DataGrid
            rows={universities}
            columns={tableHead}
            showCellRightBorder
          />
        </div>
      </div>
    </>
  );
}
