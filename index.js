import _ from 'lodash';
import { flow, map, fromPairs } from 'lodash/fp';

import position from './position';
import flex from './flex';
import colors from './colors';

export default function createStyles(
    { grid = 24, steps = [5, 10, 20, 40, 80], makeGlobal = false }
) {
    const directions = {
        x: ['-left', '-right'],
        y: ['-top', '-bottom'],
        t: ['-top'],
        r: ['-right'],
        b: ['-bottom'],
        l: ['-left']
    };

    const styles = _.assign({}, flex, position, colors);

    _.range(grid).forEach(col => {
        styles[`col-${col + 1}-${grid}`] = {
            width: `${100 * (col + 1) / grid}%`
        };
    });

    _.forEach(steps, (step, ii) => {
        styles.w0 = { width: 0 };
        styles.h0 = { height: 0 };
        styles[`w${ii}`] = { width: step + 'px' };
        styles[`h${ii}`] = { height: step + 'px' };
    });

    ['margin', 'padding'].forEach(type => {
        const prefix = type.substring(0, 1);

        _.forEach(steps, (step, ii) => {
            styles[prefix + ii] = {
                [type]: step + 'px'
            };

            _.map(directions, (props, direction) => {
                styles[prefix + direction + ii] = flow(
                    map(prop => [type + prop, step + 'px']),
                    fromPairs
                )(props);
            });
        });

        _.range(grid).forEach(col => {
            _.map(directions, (props, direction) => {
                styles[`${prefix}${direction}-${col + 1}-${grid}`] = flow(
                    map(prop => [type + prop, `${100 * (col + 1) / grid}%`]),
                    fromPairs
                )(props);
            });
        });
    });

    if (makeGlobal) {
        // this makes sense in combination with "jss-compose"
        return { '@global': _.mapKeys(styles, (value, c) => '.' + c) };
    } else {
        return styles;
    }
}
