import { type ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type ServiceClientConstructor<T> = new (useMock: boolean) => T;

interface IUseServiceClientProps<T> {
	service: ServiceClientConstructor<T>;
}

const shouldUseMock = (params: ReadonlyURLSearchParams | null) => {
	return Boolean(params?.get("useMock"));
};

export const useServiceClient = <T>({ service }: IUseServiceClientProps<T>) => {
	const useMock = shouldUseMock(useSearchParams());

	const ServiceClient = useMemo(() => new service(useMock), [service, useMock]);

	return ServiceClient;
};
