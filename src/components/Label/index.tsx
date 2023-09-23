import './index.less';

interface LabelProps {
  children?: React.ReactNode;
  label?: string;
  hideColon?: boolean;
  required?: boolean;
  className?: string;
}

export default (props: LabelProps): React.ReactNode => {
  if (!props.children && !props.label) {
    return null;
  }

  const genClassName = () => {
    let _cls = 'do-comp-label';
    if (props.className) {
      _cls += ' ' + props.className;
    }
    if (props.type === 'border') {
      _cls += ' label-border';
    }
    return _cls;
  };

  const genLabelName = () => {
    if (!props.label) {
      return null;
    }
    let _labelName = props.label;
    if (props.type !== 'border' && !props.hideColon) {
      _labelName += ':';
    }
    return _labelName;
  };
  return (
    <div className={genClassName()}>
      <span className="label-name">
        {props.required ? <span className="label-required">* </span> : null}
        {genLabelName()}
      </span>
      {props.children}
    </div>
  );
};
