export interface Select2Selection {
    selection: any;
    
    selectItem (string) : void;
    unselectItem (string) : void;
    getSelect2Value () : [string, any];
}
