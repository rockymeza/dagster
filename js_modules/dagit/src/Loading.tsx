import * as React from "react";
import styled from "styled-components";
import { QueryResult } from "react-apollo";
import { ProgressBar, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

interface ILoadingProps<TData> {
  queryResult: QueryResult<TData, any>;
  children: (data: TData) => React.ReactNode;
}

export default class Loading<TData> extends React.Component<
  ILoadingProps<TData>
> {
  public render() {
    const { error, data } = this.props.queryResult;
    if (error) {
      console.error(error);
      return (
        <LoadingContainer>
          <LoadingCentering>
            <NonIdealState
              icon={IconNames.ERROR}
              title="GraphQL Error - see console for details"
            />
          </LoadingCentering>
        </LoadingContainer>
      );
    }
    if (!data || Object.keys(data).length === 0) {
      return (
        <LoadingContainer>
          <LoadingCentering>
            <ProgressBar />
          </LoadingCentering>
        </LoadingContainer>
      );
    }
    return this.props.children(data as TData);
  }
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingCentering = styled.div`
  max-width: 600px;
  width: 75%;
`;
