import {
    Fragment,
    FunctionComponent,
    useEffect,
    useRef,
    useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { EntityType, Government, Party, PartyMember } from "../models";
import AddButton from "./addButton";
import DeleteButton from "./deleteButton";
import {
    setSelectedGovernment,
    setSelectedParty,
    setSelectedPartyMember,
} from "../redux/dataSlice";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {
    getAndShowGovernmentArticles,
    getAndShowPartyArticles,
    getAndShowPartyMemberArticles,
} from "../apis/articleAPi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type ChooserProps = {
    isShowEditButtons: boolean;
};

interface Option {
    value: string;
    label: string;
}

export const EntityChooser: React.FC<ChooserProps> = ({
    isShowEditButtons,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const allGovernments = useSelector(
        (state: RootState) => state.data1.governments
    );
    const allParties = useSelector((state: RootState) => state.data1.parties);
    const allPartyMembers = useSelector(
        (state: RootState) => state.data1.partyMembers
    );
    const partyAndGovernment = useSelector(
        (state: RootState) => state.data1.partyAndGovernment
    );
    const partyMemberAndParty = useSelector(
        (state: RootState) => state.data1.partyMemberAndParty
    );

    const { governmentUUID, partyUUID, partyMemberUUID } = useParams(); //url params

    const selectedGovernment = allGovernments.find(
        (governmentI) => governmentI.entity_uuid == governmentUUID
    );

    const selectedParty = allParties.find(
        (partyI) => partyI.entity_uuid == partyUUID
    );

    const selectedPartyMember = allPartyMembers.find(
        (partyMemberI) => partyMemberI.entity_uuid == partyMemberUUID
    );

    useEffect(() => {
        if (selectedGovernment) {
            const govParties = getGovernmentParties(
                selectedGovernment?.entity_uuid,
                partyAndGovernment,
                allParties
            );
            const newPartyOptions: any = [];
            govParties.forEach((partyI) => {
                if (partyI) {
                    newPartyOptions.push({
                        value: partyI.entity_uuid,
                        label: partyI.name,
                    });
                }
            });

            setPartyOptions(newPartyOptions);
        }
    }, [selectedGovernment, allParties]);

    useEffect(() => {
        if (selectedParty) {
            const partyMembers = getPartyMembers(
                selectedParty?.entity_uuid,
                partyMemberAndParty,
                allPartyMembers
            );
            const newPartyOptions: any = [];
            partyMembers.forEach((partyMemberI) => {
                if (partyMemberI) {
                    newPartyOptions.push({
                        value: partyMemberI.entity_uuid,
                        label: partyMemberI.name,
                    });
                }
            });

            setPartyMemberOptions(newPartyOptions);
        }
    }, [selectedParty, allPartyMembers]);

    const [governmentOptions, setGovernmentOptions] = useState<Option[]>([]);
    const [partyOptions, setPartyOptions] = useState<Option[]>([]);
    const [partyMemberOptions, setPartyMemberOptions] = useState<Option[]>([]);

    const isDeleteGovernmentButtonEnabled =
        partyAndGovernment.filter(
            (partyAndGovernmentI) =>
                partyAndGovernmentI.government_uuid ==
                selectedGovernment?.entity_uuid
        ).length == 0;
    const isDeletePartyButtonEnabled =
        partyMemberAndParty.filter(
            (partyMemberAndPartyI) =>
                partyMemberAndPartyI.party_uuid == selectedParty?.entity_uuid
        ).length == 0;
    const isDeletePartyMemberButtonEnabled = true;

    useEffect(() => {
        const initialGovOptions: Option[] = [];
        allGovernments &&
            allGovernments.forEach((itemI) => {
                initialGovOptions.push({
                    value: itemI.entity_uuid,
                    label: itemI.name,
                });
            });
        setGovernmentOptions(initialGovOptions);
    }, [allGovernments]);

    const onGovernmentChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedGovernment = allGovernments.filter(
            (govI) => govI.entity_uuid == selectedValue
        )[0];

        if (location.pathname.includes("admin") && selectedGovernment) {
            navigate(`/admin/entity/${selectedGovernment.entity_uuid}`);
        } else if (location.pathname.includes("admin") && !selectedGovernment) {
            navigate(`/admin/`);
        } else {
            navigate(`/entity/${selectedGovernment.entity_uuid}`);
        }

        if (selectedGovernment) {
            getAndShowGovernmentArticles(
                dispatch,
                selectedGovernment.entity_uuid,
                () => {}
            );
        }
    };

    const onPartyChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedParty = allParties.filter(
            (partyI) => partyI.entity_uuid == selectedValue
        )[0];

        // if(location.pathname.includes('admin') && selectedGovernment){
        //     navigate(`/admin/entity/${selectedGovernment.entity_uuid}`);
        // }else if(location.pathname.includes('admin') && !selectedGovernment){
        //     navigate(`/admin/`);
        // }else{
        //     navigate(`/entity/${selectedGovernment.entity_uuid}`);
        // }

        if (location.pathname.includes("admin") && selectedParty) {
            navigate(
                `/admin/entity/${selectedGovernment?.entity_uuid}/${selectedParty.entity_uuid}`
            );
        } else if (location.pathname.includes("admin") && !selectedParty) {
            navigate(`/admin/entity/${selectedGovernment?.entity_uuid}`);
        } else if (
            !location.pathname.includes("admin") &&
            selectedGovernment &&
            selectedParty
        ) {
            navigate(
                `/entity/${selectedGovernment?.entity_uuid}/${selectedParty.entity_uuid}`
            );
        } else if (
            !location.pathname.includes("admin") &&
            selectedGovernment &&
            !selectedParty
        ) {
            navigate(`/entity/${selectedGovernment?.entity_uuid}`);
        }

        if (selectedParty) {
            getAndShowPartyArticles(
                dispatch,
                selectedParty.entity_uuid,
                () => {}
            );
        }
    };

    const onPartyMemberChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedPartyMember = allPartyMembers.filter(
            (partyMemberI) => partyMemberI.entity_uuid == selectedValue
        )[0];

        if (
            location.pathname.includes("admin") &&
            selectedParty &&
            selectedParty &&
            selectedPartyMember
        ) {
            navigate(
                `/admin/entity/${selectedGovernment?.entity_uuid}/${selectedParty?.entity_uuid}/${selectedPartyMember?.entity_uuid}`
            );
        }else if (location.pathname.includes("admin") &&
        selectedParty &&
        selectedParty &&
        !selectedPartyMember){
            navigate(
                `/admin/entity/${selectedGovernment?.entity_uuid}/${selectedParty?.entity_uuid}`
            );
        }

        if(selectedPartyMember){
            getAndShowPartyMemberArticles(
                dispatch,
                selectedPartyMember.entity_uuid,
                () => {}
            );
        }
    };

    const dropDownAndButtonsStyle: React.CSSProperties = {
        display: "flex",
        marginBottom: "10px",
    };

    const dropdownStyle: React.CSSProperties = {
        minWidth: 317,
        marginLeft: 20,
    };

    function onGovernmentDeleteSuccess() {
        // setSelectedGovernment(null);
    }

    function onPartyDeleteSuccess() {
        // setSelectedGovernment(null);
    }

    function onPartyMemberDeleteSuccess() {
        // setSelectedGovernment(undefined);
    }

    return (
        <Fragment>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="government" style={dropDownAndButtonsStyle}>
                    <FormControl style={dropdownStyle}>
                        <InputLabel>ממשלה</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                                selectedGovernment
                                    ? selectedGovernment?.entity_uuid
                                    : ""
                            }
                            label="ממשלה"
                            placeholder="ממשלה"
                            onChange={(e) => onGovernmentChange(e)}
                        >
                            <MenuItem key="clear" value={""}>
                                &nbsp;
                            </MenuItem>
                            {governmentOptions.map((optionI: Option) => (
                                <MenuItem
                                    key={optionI.value}
                                    value={optionI.value}
                                >
                                    {optionI.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {isShowEditButtons && (
                        <AddButton
                            entityType={EntityType.government}
                            parentUUID={undefined}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeleteGovernmentButtonEnabled}
                            entityUUID={selectedGovernment?.entity_uuid}
                            entityType={EntityType.government}
                            onSuccess={() => onGovernmentDeleteSuccess()}
                        />
                    )}
                </div>

                <div className="party" style={dropDownAndButtonsStyle}>
                    <FormControl style={dropdownStyle}>
                        <InputLabel>מפלגה</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                                selectedParty ? selectedParty?.entity_uuid : ""
                            }
                            label="מפלגה"
                            onChange={onPartyChange}
                        >
                            <MenuItem key="clear" value={""}>
                                &nbsp;
                            </MenuItem>
                            {partyOptions.map((optionI: Option) => (
                                <MenuItem
                                    key={optionI.value}
                                    value={optionI.value}
                                >
                                    {optionI.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {isShowEditButtons && (
                        <AddButton
                            entityType={EntityType.party}
                            parentUUID={selectedGovernment?.entity_uuid}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeletePartyButtonEnabled}
                            entityUUID={selectedParty?.entity_uuid}
                            entityType={EntityType.party}
                            onSuccess={() => onPartyDeleteSuccess()}
                        />
                    )}
                </div>

                <div style={dropDownAndButtonsStyle}>
                    <FormControl style={dropdownStyle}>
                        <InputLabel>חבר כנסת</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                                selectedPartyMember
                                    ? selectedPartyMember?.entity_uuid
                                    : ""
                            }
                            label="חבר כנסת"
                            onChange={onPartyMemberChange}
                        >
                            <MenuItem key="clear" value={""}>
                                &nbsp;
                            </MenuItem>
                            {partyMemberOptions.map((optionI: Option) => (
                                <MenuItem
                                    key={optionI.value}
                                    value={optionI.value}
                                >
                                    {optionI.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {isShowEditButtons && (
                        <AddButton
                            entityType={EntityType.partyMember}
                            parentUUID={selectedParty?.entity_uuid}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeletePartyMemberButtonEnabled}
                            entityUUID={selectedPartyMember?.entity_uuid}
                            entityType={EntityType.partyMember}
                            onSuccess={() => onPartyMemberDeleteSuccess()}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};
