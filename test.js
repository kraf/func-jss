import jss from 'jss';
import preset from 'jss-preset-default';

import bass from './index';

jss.setup(preset());

jss.createStyleSheet(bass({ makeGlobal: true })).attach();
