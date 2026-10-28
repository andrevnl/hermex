// Parâmetros da URL da home, lidos no servidor e escritos pelo navegador.
export const CATEGORY_PARAM = "categoria";
const PICKUP_LOCATION_PARAM = "retirada";
const RETURN_LOCATION_PARAM = "devolucao";
const PICKUP_AT_PARAM = "inicio";
const RETURN_AT_PARAM = "fim";

type PageSearchParams = Record<string, string | string[] | undefined>;

// Campos da barra de busca, como o usuário preenche.
export type SearchValues = {
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnLocation: string;
  returnDate: string;
  returnTime: string;
};

// Busca já montada; datas no formato local "AAAA-MM-DDTHH:mm".
export type VehicleSearch = {
  pickupLocationId: string;
  returnLocationId: string;
  pickupAt: string;
  returnAt: string;
};

const LOCAL_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

function readParam(params: PageSearchParams, key: string) {
  const value = params[key];
  return typeof value === "string" ? value : "";
}

function isValidDateTime(value: string) {
  return LOCAL_DATE_TIME.test(value) && !Number.isNaN(Date.parse(value));
}

export function readCategory(params: PageSearchParams) {
  return readParam(params, CATEGORY_PARAM) || null;
}

// Só considera a busca completa e coerente; qualquer outra coisa é ignorada e
// a home volta à listagem padrão.
export function readSearch(params: PageSearchParams): VehicleSearch | null {
  const search = {
    pickupLocationId: readParam(params, PICKUP_LOCATION_PARAM),
    returnLocationId: readParam(params, RETURN_LOCATION_PARAM),
    pickupAt: readParam(params, PICKUP_AT_PARAM),
    returnAt: readParam(params, RETURN_AT_PARAM),
  };

  const isComplete = Object.values(search).every(Boolean);
  const hasValidDates =
    isValidDateTime(search.pickupAt) && isValidDateTime(search.returnAt);

  return isComplete && hasValidDates && search.returnAt > search.pickupAt
    ? search
    : null;
}

// Grava a busca na URL, ou a remove quando `search` é null.
export function writeSearch(
  params: URLSearchParams,
  search: VehicleSearch | null,
) {
  const entries = [
    [PICKUP_LOCATION_PARAM, search?.pickupLocationId],
    [RETURN_LOCATION_PARAM, search?.returnLocationId],
    [PICKUP_AT_PARAM, search?.pickupAt],
    [RETURN_AT_PARAM, search?.returnAt],
  ] as const;

  for (const [key, value] of entries) {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }
}

export function valuesToSearch(values: SearchValues): VehicleSearch {
  return {
    pickupLocationId: values.pickupLocation,
    returnLocationId: values.returnLocation,
    pickupAt: `${values.pickupDate}T${values.pickupTime}`,
    returnAt: `${values.returnDate}T${values.returnTime}`,
  };
}

export function searchToValues(
  search: VehicleSearch | null,
): Partial<SearchValues> {
  if (!search) return {};

  const [pickupDate, pickupTime] = search.pickupAt.split("T");
  const [returnDate, returnTime] = search.returnAt.split("T");
  return {
    pickupLocation: search.pickupLocationId,
    pickupDate,
    pickupTime,
    returnLocation: search.returnLocationId,
    returnDate,
    returnTime,
  };
}
