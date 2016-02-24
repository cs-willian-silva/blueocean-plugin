package io.jenkins.blueocean.api.pipeline;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.jenkins.blueocean.security.Identity;

import javax.annotation.Nonnull;

/**
 * Request for {@link PipelineService#getPipelineRun(Identity, GetPipelineRunRequest)}
 *
 * @author Vivek Pandey
 */
public final class GetPipelineRunRequest {
    @JsonProperty("organization")
    public final String organization;

    @JsonProperty("pipeline")
    public final String pipeline;

    public GetPipelineRunRequest(@Nonnull @JsonProperty("organization") String organization,
                                 @Nonnull @JsonProperty("pipeline") String pipeline) {
        this.organization = organization;
        this.pipeline = pipeline;

    }
}