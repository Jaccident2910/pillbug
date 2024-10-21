import { Status } from "megalodon/lib/src/entities/status";
import { EditorDocument } from "./editor-types";
import {
    MegalodonEditorTransformer,
    MegalodonPostStatus,
} from "./megalodon-status-transformer";
import { SessionAuthManager } from "~/auth/auth-manager";

type CommentPreTransform = {};

/** Megalodon status transformer that attaches an in_reply_to_id, for use with comments */
export class CommentTransformer extends MegalodonEditorTransformer<CommentPreTransform> {
    constructor(auth: SessionAuthManager, private inReplyTo: Status) {
        super(auth);
    }

    protected override async postTransform(
        doc: EditorDocument,
        status: MegalodonPostStatus,
        preTransform: CommentPreTransform | undefined
    ): Promise<MegalodonPostStatus> {
        status.options.in_reply_to_id = this.inReplyTo.id;
        if (status.options.in_reply_to_id === undefined) {
            throw new Error("Failed to set in-reply-to id");
        }
        return status;
    }
}