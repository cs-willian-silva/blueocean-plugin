import React, { Component, PropTypes } from 'react';
import { ResultItem } from '@jenkins-cd/design-language';
import { calculateLogUrl } from '../redux';

import LogConsole from './LogConsole';

const { object, func, string } = PropTypes;

export default class Node extends Component {
    componentWillMount() {
        const { node, nodesBaseUrl, fetchLog } = this.props;
        const { config = {} } = this.context;
        if (node && node.isFocused) {
            const mergedConfig = { ...config, node, nodesBaseUrl };
            fetchLog(mergedConfig);
        }
    }

    render() {
        const { node, logs, nodesBaseUrl, fetchLog } = this.props;
        // Early out
        if (!node || !fetchLog) {
            return null;
        }
        const { config = {} } = this.context;
        const {
          title,
          durationInMillis,
          result,
          id,
          isFocused,
          state,
        } = node;

        const resultRun = result === 'UNKNOWN' || !result ? state : result;
        const log = logs ? logs[calculateLogUrl({ ...config, node, nodesBaseUrl })] : null;

        const getLogForNode = () => {
            if (!log) {
                fetchLog({ ...config, node, nodesBaseUrl });
            }
        };
        return (<div>
            <ResultItem
              key={id}
              result={resultRun.toLowerCase()}
              expanded={isFocused}
              label={title}
              onExpand={getLogForNode}
              durationMillis={durationInMillis}
            >
                { log && <LogConsole key={id} data={log.text} /> } &nbsp;
            </ResultItem>
      </div>);
    }
}

Node.propTypes = {
    node: object.isRequired,
    logs: object,
    fetchLog: func,
    nodesBaseUrl: string,
};
